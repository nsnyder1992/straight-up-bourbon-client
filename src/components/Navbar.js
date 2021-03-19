import { useCallback, useContext, useEffect, useState } from "react";
import { Route, Link, Switch, useHistory } from "react-router-dom";
import clsx from "clsx";

//material components
import {
  IconButton,
  Typography,
  Badge,
  Hidden,
  Drawer,
  List,
  ListItem,
  ListItemText,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import MenuIcon from "@material-ui/icons/Menu";

//components
import Footer from "./Footer";
import Home from "./Home/Home";
import About from "./Home/About/About";
import Suggestions from "./Home/Bourbon/Bourbon";
import Shop from "./Shop/Shop";
import Profile from "./Home/Profile/Profile";
import ProductPage from "./Shop/Products/ProductPage";

//sub-components
import ShoppingCart from "./Shop/ShoppingCart/ShoppingCart";

//context
import { CartContext } from "../helpers/context/shopping-cart";

//images
import logo from "./images/logo.png";

//styles
import "./styles/Navbar.css";

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  fullList: {
    width: "auto",
  },
});

const Navbar = ({ numItems }) => {
  const classes = useStyles();
  const history = useHistory();

  //context
  const { cart } = useContext(CartContext);

  //nav panel
  const [open, setOpen] = useState(false);

  const toggleNav = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(open);
  };

  //Shopping Cart panel states
  const [openCart, setOpenCart] = useState(false);

  //open in close Shopping Cart Panel
  const toggleCart = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpenCart(open);
  };

  //handle profile
  const handleProfile = (e) => {
    e.preventDefault();
    history.push("/profile");
  };

  return (
    <header>
      <ShoppingCart openCart={openCart} toggleCart={toggleCart} />
      <div className="navbar">
        <nav>
          <div className="left-nav">
            <Hidden xsDown>
              <Link to="/" className="flex-item">
                <img src={logo} style={{ width: 100 }} alt="logo" />
              </Link>
              <Link to="/" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  Home
                </Typography>
              </Link>
              <Link to="/about" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  About
                </Typography>
              </Link>
              <Link to="/bourbon" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  Bourbon
                </Typography>
              </Link>
              <Link to="/shop" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  Shop
                </Typography>
              </Link>
            </Hidden>

            <Hidden only={["sm", "md", "lg", "xl"]}>
              <IconButton onClick={toggleNav(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>

          <div className="right-nav">
            <IconButton onClick={handleProfile}>
              <PersonOutlineIcon />
            </IconButton>

            <IconButton onClick={(e) => e.preventDefault()}>
              <AttachMoneyIcon />
            </IconButton>
            <IconButton onClick={toggleCart(true)}>
              <Badge badgeContent={numItems} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>
          </div>
        </nav>
      </div>

      <Drawer anchor={"left"} open={open} onClose={toggleNav(false)}>
        <div
          className={clsx(classes.list)}
          role="presentation"
          onClick={toggleNav(false)}
          onKeyDown={toggleNav(false)}
        >
          <List>
            <Link to="/" className="flex-item-panel">
              <ListItem button>
                <ListItemText>HOME</ListItemText>
              </ListItem>
            </Link>
            <Link to="/about" className="flex-item-panel">
              <ListItem button>
                <ListItemText>About</ListItemText>
              </ListItem>
            </Link>
            <Link to="/bourbon" className="flex-item-panel">
              <ListItem button>
                <ListItemText>BOURBON</ListItemText>
              </ListItem>
            </Link>
            <Link to="/shop" className="flex-item-panel">
              <ListItem button>
                <ListItemText>SHOP</ListItemText>
              </ListItem>
            </Link>
          </List>
        </div>
      </Drawer>

      <div className="apps">
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/bourbon">
            <Suggestions />
          </Route>
          <Route exact path="/shop">
            <Shop />
          </Route>
          <Route exact path="/product/:id">
            <ProductPage />
          </Route>
          <Route exact path="/profile">
            <Profile />
          </Route>
        </Switch>
      </div>

      <Footer />
    </header>
  );
};

export default Navbar;
