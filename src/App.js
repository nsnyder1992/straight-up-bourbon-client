import { useEffect, createContext, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//material styling
import { ThemeProvider } from "@material-ui/core/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

//components
import Navbar from "./components/Navbar";

//context
import { TokenContext } from "./helpers/context/token-context";
import { CartContext } from "./helpers/context/shopping-cart";

//styles
import "./App.css";
//set up base theme
const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
  },
});

function App() {
  //set title
  document.title = "Straight Up Bourbon";

  ///////////////////////////////////////////////////////////
  // SIGN IN/OUT (USING CONTEXT)
  ///////////////////////////////////////////////////////////
  const [sessionToken, setSessionToken] = useState("");

  //every time the app re-renders check for token in local storage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));
    }
  }, []);

  //updates token in local storage and in the state sessionToken
  const updateToken = (newToken) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
  };

  //deletes all local storage... used mainly for logout
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    clearCart();
  };

  ///////////////////////////////////////////////////////////
  // SHOPPING CART (USING CONTEXT)
  ///////////////////////////////////////////////////////////
  const [cart, setCart] = useState({ products: [], subtotal: 0, numItems: 0 });
  const [numItems, setNumItems] = useState(0);

  const addToCart = (product) => {
    let tempCart = cart;

    if (tempCart.products.length >= 0) {
      for (let prod in tempCart.products) {
        let tempProd = tempCart.products[prod];
        if (tempProd.id === product.id && tempProd.size === product.size) {
          //update temp cart
          tempCart.products[prod].qty += product.qty;
          tempCart.numItems += product.qty;
          tempCart.subtotal += product.cost * product.qty;

          setNumItems(tempCart.numItems);

          //set cart and local storage
          setCart(tempCart);
          localStorage.setItem("cart", JSON.stringify(tempCart));
          return;
        }
      }
    }

    //first item or item not found
    tempCart.products.push(product);
    tempCart.numItems += product.qty;
    tempCart.subtotal += product.cost * product.qty;

    //set cart and local storage
    setNumItems(tempCart.numItems);
    localStorage.setItem("cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const removeFromCart = (product, index) => {
    let tempCart = cart;
    if (tempCart.products.length <= 0) return;

    console.log(product);

    for (let prod in tempCart.products) {
      let tempProd = tempCart.products[prod];
      if (tempProd.id === product.id && tempProd.size === product.size) {
        //update cart
        tempCart.numItems =
          tempCart.numItems - (tempCart.products[prod].qty - product.qty);
        tempCart.subtotal -=
          product.cost * (tempCart.products[prod].qty - product.qty);
        tempCart.products[prod].qty = product.qty;

        if (tempCart.products[prod].qty <= 0)
          tempCart.products.splice(index, 1);

        setNumItems(tempCart.numItems);
        setCart(tempCart);
        localStorage.setItem("cart", JSON.stringify(tempCart));

        return;
      }
    }

    localStorage.setItem("cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const clearCart = () => {
    setCart({ products: [], subtotal: 0, numItems: 0 });
  };

  //every time the app re-renders check for cart in local storage
  useEffect(() => {
    if (localStorage.getItem("cart")) {
      setCart(JSON.parse(localStorage.getItem("cart")));
      setNumItems(JSON.parse(localStorage.getItem("cart")).numItems);
    }
  }, []);

  return (
    <div className="App">
      <TokenContext.Provider value={{ sessionToken, updateToken, clearToken }}>
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, clearCart }}
        >
          <Router>
            <ThemeProvider theme={theme}>
              <Navbar numItems={numItems} />
            </ThemeProvider>
          </Router>
        </CartContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
