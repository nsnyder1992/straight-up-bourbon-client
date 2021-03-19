import { useContext, useState } from "react";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

//material ui components
import {
  Drawer,
  List,
  ListItem,
  Typography,
  Divider,
  ListItemText,
  Grid,
} from "@material-ui/core";

//components
import ProductQuantity from "./ProductQuantity";

//material styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
});

const ShoppingCart = ({ openCart, toggleCart }) => {
  const classes = useStyles(); //styles

  //context states
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  return (
    <Drawer anchor={"right"} open={openCart} onClose={toggleCart(false)}>
      <div className={clsx(classes.list)} role="presentation">
        <Typography variant="h4" style={{ marginLeft: 15, marginTop: 15 }}>
          CART
        </Typography>
        <Divider style={{ marginTop: 25 }} />
        <List>
          {cart.products.map((product, key) => {
            return (
              <ListItem key={key}>
                <img
                  width={75}
                  style={{ margin: 10 }}
                  src={product.img}
                  alt="product-image"
                />

                <ListItemText>
                  <Grid container spacing={0}>
                    <Grid item xs={12}>
                      <Typography variant="body1">{product.name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="caption">{product.size}</Typography>
                    </Grid>
                    <Grid item xs={12}></Grid>
                  </Grid>
                  <div className="quantity-cost">
                    <ProductQuantity
                      product={product}
                      addToCart={addToCart}
                      removeFromCart={removeFromCart}
                      index={key}
                    />
                  </div>
                </ListItemText>
              </ListItem>
            );
          })}
        </List>
      </div>
    </Drawer>
  );
};

export default ShoppingCart;
