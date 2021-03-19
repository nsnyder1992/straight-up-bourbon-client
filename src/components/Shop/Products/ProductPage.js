import { useContext, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

//material components
import { Typography, Grid, Divider, Button } from "@material-ui/core";

//components
import ProductSize from "./ProductSize";
import ProductQuantity from "./ProductQuantity";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

//styles
import "./styles/ProductPage.css";

//test products
import { PRODUCTS } from "../../../helpers/test/products";

const ProductPage = () => {
  const history = useHistory();
  const { id } = useParams();

  //context
  const { addToCart } = useContext(CartContext);

  //states
  const [sizeIndex, setSizeIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    let product = JSON.parse(JSON.stringify(PRODUCTS[id]));
    console.log("product page quantity", quantity);
    console.log("product page product", product);
    product.qty = 0; //null out qty before send
    product.qty = quantity;
    console.log("product page product", product);
    product.size = PRODUCTS[id].sizes[sizeIndex];

    addToCart(product);
    history.push("/shop");
  };

  return (
    <div className="product-page">
      <Grid container spacing={3} className="product-content">
        <Grid item sm={6}>
          <img
            className="product-image"
            src={PRODUCTS[id].img}
            alt="product-image"
          />
        </Grid>
        <Grid item sm={6}>
          <Typography variant="h5">
            {PRODUCTS[id].name.toUpperCase()}
          </Typography>
          <Typography variant="body1">{`$${PRODUCTS[id].cost}.00`}</Typography>
          <Divider style={{ margin: 25 }} />
          {PRODUCTS[id].sizes.length > 0 ? (
            <ProductSize
              sizes={PRODUCTS[id].sizes}
              sizeIndex={sizeIndex}
              setSizeIndex={setSizeIndex}
            />
          ) : null}
          <ProductQuantity quantity={quantity} setQuantity={setQuantity} />
          <div className="left-in-stock">
            <Typography variant="caption" id="left-in-stock">
              {PRODUCTS[id].stock.bySize[PRODUCTS[id].sizes[sizeIndex]] < 10
                ? `Only ${
                    PRODUCTS[id].stock.bySize[PRODUCTS[id].sizes[sizeIndex]]
                  } left in stock`
                : PRODUCTS[id].stock.total < 10
                ? `Only ${PRODUCTS[id].stock.total} left in stock`
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
              {PRODUCTS[id].description.main}
            </Typography>
            <ul>
              {PRODUCTS[id].description.points.map((point, key) => {
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
    </div>
  );
};

export default ProductPage;
