import { useContext, useState } from "react";
import { Route, Link, Switch, useHistory, useLocation } from "react-router-dom";
import clsx from "clsx";

//material components
import {
  IconButton,
  Typography,
  Badge,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Button,
  SwipeableDrawer,
} from "@material-ui/core";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import ShoppingCartOutlinedIcon from "@material-ui/icons/ShoppingCartOutlined";
import PersonOutlineIcon from "@material-ui/icons/PersonOutline";
import MenuIcon from "@material-ui/icons/Menu";

//components
import Footer from "./Footer";
import YouTubeSubscribe from "./YoutubeSubscribe";
import Home from "./Home/Home";
import Shop from "./Shop/Shop";
import Profile from "./Home/Profile/Profile";
import ProductPage from "./Shop/Products/ProductPage";
import ResetPassword from "./Auth/ResetPassword";
import Canceled from "./Shop/Checkout/Canceled";
import Success from "./Shop/Checkout/Success";
import Orders from "./class-components/Orders/Orders";
import Order from "./Admin/Orders/Order";
import Users from "./Admin/Users/Users";

//sub-components
import ShoppingCart from "./Shop/ShoppingCart/ShoppingCart";

//context
import { TokenContext } from "../helpers/context/token-context";

//images
import logo from "./images/logo.png";

//styles
import "./styles/Navbar.css";
import Meta from "./Admin/Meta/Meta";
import MetaPage from "./MetaPage";
import AdminPage from "./Admin/Admin/AdminPage";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  list: {
    width: 250,
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
    justifyContent: "flex-end",
  },
}));

const Navbar = ({ numItems }) => {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();

  //context
  const { isAdmin, toggleAdmin, adminView } = useContext(TokenContext);

  //nav panel
  const [open, setOpen] = useState(false);

  const toggleNav = (open) => (event) => {
    if (
      event &&
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
      event &&
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
            <Hidden smDown>
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
              <Link to="/shop" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  Shop
                </Typography>
              </Link>
              {isAdmin ? (
                <div>
                  <Link to="/order" className="flex-item">
                    <Typography className="nav-link nav-link-fade-up">
                      Orders
                    </Typography>
                  </Link>
                  <Link to="/user" className="flex-item">
                    <Typography className="nav-link nav-link-fade-up">
                      Users
                    </Typography>
                  </Link>
                  <Link to="/meta" className="flex-item">
                    <Typography className="nav-link nav-link-fade-up">
                      Meta
                    </Typography>
                  </Link>
                  <Link to="/admin" className="flex-item">
                    <Typography className="nav-link nav-link-fade-up">
                      Admin
                    </Typography>
                  </Link>
                </div>
              ) : null}
            </Hidden>

            <Hidden only={["md", "lg", "xl"]}>
              <IconButton onClick={toggleNav(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
          </div>
          <Hidden only={["md", "lg", "xl"]}>
            <div className={isAdmin ? "center-nav-admin" : "center-nav"}>
              <img src={logo} style={{ width: 100 }} alt="logo" />
            </div>
          </Hidden>
          <div className="right-nav">
            <IconButton onClick={handleProfile}>
              <PersonOutlineIcon />
            </IconButton>
            <IconButton onClick={toggleCart(true)}>
              <Badge badgeContent={numItems} color="secondary">
                <ShoppingCartOutlinedIcon />
              </Badge>
            </IconButton>

            {isAdmin ? (
              <Button
                color={adminView ? "primary" : ""}
                variant={adminView ? "contained" : ""}
                onClick={toggleAdmin}
              >
                Admin
              </Button>
            ) : null}
            <div className="youtube-btn" style={{ display: "none" }}>
              <YouTubeSubscribe />
            </div>
          </div>
        </nav>
      </div>

      <SwipeableDrawer
        anchor={"left"}
        open={open}
        onClose={toggleNav(false)}
        onOpen={toggleNav(true)}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={toggleNav(false)}>
            <Close />
          </IconButton>
        </div>
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
                <ListItemText>ABOUT</ListItemText>
              </ListItem>
            </Link>
            <Link to="/shop" className="flex-item-panel">
              <ListItem button>
                <ListItemText>SHOP</ListItemText>
              </ListItem>
            </Link>
          </List>
          {isAdmin ? (
            <div>
              <Link to="/order" className="flex-item-panel">
                <ListItem button>
                  <ListItemText>ORDERS</ListItemText>
                </ListItem>
              </Link>
              <Link to="/user" className="flex-item-panel">
                <ListItem button>
                  <ListItemText>USERS</ListItemText>
                </ListItem>
              </Link>
              <Link to="/meta" className="flex-item-panel">
                <ListItem button>
                  <ListItemText>META</ListItemText>
                </ListItem>
              </Link>
              <Link to="/admin" className="flex-item">
                <Typography className="nav-link nav-link-fade-up">
                  ADMIN
                </Typography>
              </Link>
            </div>
          ) : null}
        </div>
      </SwipeableDrawer>

      <div className="apps">
        <Switch>
          <MetaPage>
            <Route exact path="/">
              <Home />
            </Route>
            <Route exact path="/about">
              <></>
            </Route>
            <Route exact path="/shop">
              <Shop />
            </Route>
            <Route exact path="/order">
              <Orders />
            </Route>
            <Route exact path="/order/:id">
              <Order />
            </Route>
            <Route exact path="/user">
              <Users />
            </Route>
            <Route exact path="/meta">
              <Meta />
            </Route>
            <Route exact path="/admin">
              <AdminPage />
            </Route>
            <Route exact path="/product/:id">
              <ProductPage />
            </Route>
            <Route exact path="/profile">
              <Profile />
            </Route>
            <Route exact path="/reset/:token">
              <ResetPassword />
            </Route>
            <Route path="/success">
              <Success />
            </Route>
            <Route path="/cancel">
              <Canceled />
            </Route>
          </MetaPage>
        </Switch>
      </div>

      <Footer />
    </header>
  );
};

export default Navbar;
