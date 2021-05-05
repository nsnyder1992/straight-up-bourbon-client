import { useContext } from "react";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

//material ui components
import { Drawer, List, Typography, Divider } from "@material-ui/core";

//components
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartFooter from "./ShoppingCartFooter";

//material styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

//styles
import "./styles/ShoppingCart.css";

const useStyles = makeStyles({
  list: {
    width: 400,
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
        <Typography variant="h4" style={{ marginLeft: 25, marginTop: 25 }}>
          CART
        </Typography>
        <Divider style={{ marginTop: 25 }} />
        <List>
          {cart.products.map((product, key) => {
            if (product.quantity > 0)
              return (
                <ShoppingCartItem
                  product={product}
                  key={key}
                  addToCart={addToCart}
                  removeFromCart={removeFromCart}
                />
              );
            return null;
          })}
        </List>
      </div>

      {cart.subtotal > 0 ? <ShoppingCartFooter cart={cart} /> : null}
    </Drawer>
  );
};

export default ShoppingCart;
