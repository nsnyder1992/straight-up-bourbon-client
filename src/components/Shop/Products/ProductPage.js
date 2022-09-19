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
  const [reload, setReload] = useState(false);

  const [outOfStock, setOutOfStock] = useState(true);

  const handleAddToCart = async (e) => {
    let newProduct = JSON.parse(JSON.stringify(product));
    newProduct.size = newProduct.sizes[sizeIndex];

    await addToCart({ product: newProduct, quantity }, quantity);
    history.push("/shop");
  };

  useEffect(() => {
    if (products) {
      let numItems = product?.stock?.bySize[sizeIndex]?.numItems;
      //if (!numItems) numItems = 0;

      if (quantity > numItems || !numItems) return setOutOfStock(true);
      setOutOfStock(false);
    }
  }, [sizeIndex, quantity, product]);

  const getProduct = () => {
    if (products) {
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
          tempStock.push(size.numItems);
        }

        setStock(tempStock);

        let tempPoints = [];
        for (let point of tempProduct?.description.points) {
          tempPoints.push(point.description);
        }

        setPoints(tempPoints);
      }
    }
  };

  useEffect(() => {
    getProduct();
  }, [products]);

  //set reload to get products after an update
  useEffect(() => {
    if (reload === true) {
      setReload(false);
      getProduct();
    }
  }, [reload]);

  return (
    <div className="product-page footer-spacing">
      <Grid container spacing={3} className="product-content">
        <Grid item sm={6}>
          <img
            className="product-image"
            src={product?.photoUrl}
            alt="product"
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
          <ProductQuantity
            quantity={quantity}
            setQuantity={setQuantity}
            stock={stock[sizeIndex]}
            outOfStock={outOfStock}
          />
          <div className="left-in-stock">
            <Typography variant="caption" id="left-in-stock">
              {outOfStock
                ? "Out of stock"
                : stock[sizeIndex] < 10
                ? `Only ${stock[sizeIndex]} left in stock!`
                : null}
            </Typography>
          </div>
          <Button
            variant="outlined"
            color="primary"
            id="add-to-cart"
            onClick={handleAddToCart}
            disabled={outOfStock}
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

      {isAdmin && adminView ? (
        <EditProduct product={product} setReload={setReload} />
      ) : null}
    </div>
  );
};

export default ProductPage;
