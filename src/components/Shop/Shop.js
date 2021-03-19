import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

//material components
import { Typography, Grid } from "@material-ui/core";

//styles
import "./styles/Shop.css";

//Test products
import { PRODUCTS } from "../../helpers/test/products";

const Shop = () => {
  const history = useHistory();
  const [products, setProducts] = useState(PRODUCTS); //currently using test products

  useEffect(() => {
    console.log("get products");
  });

  return (
    <div className="content-shop">
      <div className="products">
        <Grid container spacing={3}>
          {products?.map((product, key) => {
            return (
              <Grid
                item
                sm={6}
                md={4}
                key={key}
                className="product"
                onClick={(e) => history.push(`/product/${key}`)}
              >
                <img
                  className="product-image"
                  src={product.img}
                  alt="product-image"
                />
                <Typography>{product.name}</Typography>
                <Typography>{`$${product.cost}.00`}</Typography>
              </Grid>
            );
          })}
        </Grid>
      </div>
    </div>
  );
};

export default Shop;
