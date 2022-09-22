import { useContext, useEffect, useState } from "react";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

//material ui components
import {
  Drawer,
  List,
  Typography,
  Divider,
  SwipeableDrawer,
  IconButton,
} from "@material-ui/core";

//components
import ShoppingCartItem from "./ShoppingCartItem";
import ShoppingCartFooter from "./ShoppingCartFooter";

//material styles
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

//styles
import "./styles/ShoppingCart.css";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 300,
  },
  fullList: {
    width: "auto",
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    // padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  drawerTitle: {
    justifyContent: "flex-start",
  },
  drawerClose: {
    marginTop: 10,
    marginRight: 10,
  },
}));

const ShoppingCart = ({ openCart, toggleCart }) => {
  const classes = useStyles(); //styles

  //context states
  const { cart, addToCart, removeFromCart, setProduct } =
    useContext(CartContext);
  const [disable, setDisable] = useState(true);
  const [error, setError] = useState();
  const [refresh, setRefresh] = useState(false);
  const [empty, setEmpty] = useState(true);

  useEffect(() => {
    if (refresh) setRefresh(false);

    cart?.products?.map((product, key) => {
      if (product.quantity > 0) {
        setEmpty(false);
        return;
      }

      setEmpty(true);
      return;
    });
  }, [openCart, refresh]);

  return (
    <SwipeableDrawer
      anchor={"right"}
      open={openCart}
      onOpen={toggleCart(true)}
      onClose={toggleCart(false)}
    >
      <div className={classes.drawerHeader}>
        <Typography
          variant="h4"
          className={classes.drawerTitle}
          style={{ marginLeft: 25, marginTop: 25 }}
        >
          CART
        </Typography>
        <IconButton onClick={toggleCart(false)} className={classes.drawerClose}>
          <Close />
        </IconButton>
      </div>
      <div className={clsx(classes.list)} role="presentation">
        <Divider style={{ marginTop: 25 }} />
        <List>
          {!empty ? (
            cart.products.map((product, key) => {
              if (product.quantity > 0)
                return (
                  <ShoppingCartItem
                    product={product}
                    key={key}
                    setRefresh={setRefresh}
                    addToCart={addToCart}
                    removeFromCart={removeFromCart}
                    setProduct={setProduct}
                    setDisable={setDisable}
                    setError={setError}
                    error={error}
                  />
                );
              return null;
            })
          ) : (
            <Typography style={{ margin: 15 }}>
              Add items to your cart and you will see them here
            </Typography>
          )}
        </List>
      </div>

      {cart.subtotal > 0 ? (
        <ShoppingCartFooter
          cart={cart}
          setProduct={setProduct}
          disable={disable}
          error={error}
          setError={setError}
        />
      ) : null}
    </SwipeableDrawer>
  );
};

export default ShoppingCart;
