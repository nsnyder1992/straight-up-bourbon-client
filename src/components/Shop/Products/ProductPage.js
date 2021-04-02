import { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//material components
import { Typography, Grid, Divider, Button } from "@material-ui/core";

//components
import ProductSize from "./ProductSize";
import ProductQuantity from "./ProductQuantity";
import EditProduct from "../../Admin/Products/EditProduct";

//context
import { TokenContext } from "../../../helpers/context/token-context";
import { CartContext } from "../../../helpers/context/shopping-cart";
import { ProductContext } from "../../../helpers/context/product-context";

//styles
import "./styles/ProductPage.css";

import APIURL from "../../../helpers/environment";

const ProductPage = () => {
  const history = useHistory();
  const { id } = useParams();

  //context
  const { isAdmin, adminView } = useContext(TokenContext);
  const { addToCart } = useContext(CartContext);
  const { products, fetchProducts } = useContext(ProductContext);

  //states
  const [product, setProduct] = useState();
  const [sizeIndex, setSizeIndex] = useState(0);
  const [stock, setStock] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [points, setPoints] = useState();

  const handleAddToCart = (e) => {
    let newProduct = JSON.parse(JSON.stringify(product));
    console.log("product page quantity", quantity);
    console.log("product page product", newProduct);
    newProduct.qty = 0; //null out qty before send
    newProduct.qty = quantity;
    console.log("product page product", newProduct);
    newProduct.size = newProduct.sizes[sizeIndex];

    addToCart(newProduct);
    history.push("/shop");
  };

  const asyncFetchProducts = async () => {
    await fetchProducts();
    if (products) {
      console.log(products);
      let tempProduct;
      for (let product of products) {
        if (product.id == id) {
          tempProduct = product;
        }
      }

      if (tempProduct) {
        setProduct(tempProduct);

        let tempStock = [];
        for (let size of tempProduct?.stock.bySize) {
          console.log(size, product);
          tempStock.push(size.numItems);
        }

        setStock(tempStock);
        console.log(tempStock);
        let tempPoints = [];
        for (let point of tempProduct?.description.points) {
          tempPoints.push(point.description);
        }

        setPoints(tempPoints);
      }
    }
  };

  useEffect(() => {
    asyncFetchProducts();
  }, [products]);

  return (
    <div className="product-page footer-spacing">
      <Grid container spacing={3} className="product-content">
        <Grid item sm={6}>
          <img
            className="product-image"
            src={product?.photoUrl}
            alt="product-image"
          />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">{product?.name.toUpperCase()}</Typography>
          <Typography variant="body1">{`$${(product?.cost / 100).toFixed(
            2
          )}`}</Typography>
          <Divider style={{ margin: 25 }} />
          {product?.sizes.length > 0 ? (
            <ProductSize
              sizes={product.sizes}
              sizeIndex={sizeIndex}
              setSizeIndex={setSizeIndex}
            />
          ) : null}
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          <div className="left-in-stock">
            <Typography variant="caption" id="left-in-stock">
              {stock[sizeIndex] < 10
                ? `Only ${stock[sizeIndex]} left in stock!`
                : null}
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            id="add-to-cart"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <div className="product-description">
            <Typography variant="body1" style={{ textAlign: "left" }}>
              {product?.description.main}
            </Typography>
            <ul>
              {points?.map((point, key) => {
                return (
                  <li key={key}>
                    <Typography variant="body2" style={{ textAlign: "left" }}>
                      {point}
                    </Typography>
                  </li>
                );
              })}
            </ul>
          </div>
        </Grid>
      </Grid>

      {isAdmin && adminView ? <EditProduct product={product} /> : null}
    </div>
  );
};

export default ProductPage;
