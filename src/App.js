import { useEffect, useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";

//material styling
import { ThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";

//components
import Navbar from "./components/Navbar";

//context
import { TokenContext } from "./helpers/context/token-context";
import { CartContext } from "./helpers/context/shopping-cart";
import { ProductContext } from "./helpers/context/product-context";

//helpers
import APIURL from "./helpers/environment";

//styles
import "./App.css";

//font awesome
import { library } from "@fortawesome/fontawesome-svg-core";
import * as Icons from "@fortawesome/free-brands-svg-icons";

const iconList = Object.keys(Icons)
  .filter((key) => key !== "fas" && key !== "prefix")
  .map((icon) => Icons[icon]);

library.add(...iconList);

//set up base theme
const theme = createTheme({
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
  const [username, setUsername] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminView, setAdminView] = useState(false);

  //every time the app re-renders check for token in local storage
  useEffect(() => {
    if (localStorage.getItem("token")) {
      setSessionToken(localStorage.getItem("token"));

      fetch(`${APIURL}/user/self`, {
        method: "GET",
        headers: new Headers({
          Authorization: localStorage.getItem("token"),
        }),
      })
        .then((res) => res.json())
        .then((json) => {
          if (json.error) {
            clearToken();
          } else {
            setUsername(json.user.firstName + " " + json.user.lastName);
            setUserEmail(json.user.email);
            setIsAdmin(json.user.isAdmin);
          }
        })
        .catch(() => null);
    }
  }, []);

  //toggle admin view
  const toggleAdmin = () => {
    setAdminView(!adminView);
  };

  //updates token in local storage and in the state sessionToken
  const updateToken = (newToken, user) => {
    localStorage.setItem("token", newToken);
    setSessionToken(newToken);
    setUsername(user.firstName + " " + user.lastName);
    setUserEmail(user.email);
    setIsAdmin(user.isAdmin);
  };

  //deletes all local storage... used mainly for logout
  const clearToken = () => {
    localStorage.clear();
    setSessionToken("");
    setUsername("");
    setUserEmail("");
    setIsAdmin(false);
    clearCart();
    setNumItems(0);
  };

  ///////////////////////////////////////////////////////////
  // PRODUCTS (USING CONTEXT)
  //////////////////////////////////////////////////////////
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalProducts, setTotalProducts] = useState();

  const nextPage = () => {
    setPage(page + 1);
  };

  const findIndex = (id) => {
    for (let index in products) {
      if (products[index].id == id) return index;
    }
  };

  const deleteProduct = (product) => {
    let index = findIndex(product.id);
    let tempProducts = products;

    tempProducts.splice(index, 1);
    tempProducts[index] = product;
    formatProducts(tempProducts);
  };

  const updateProduct = (product) => {
    let index = findIndex(product.id);
    let tempProducts = products;

    tempProducts[index] = product;
    formatProducts(tempProducts);
  };

  const updateProducts = (prods) => {
    if (!Array.isArray(prods)) prods = [prods];
    let newProducts = [...products, ...prods];
    formatProducts(newProducts);
  };

  const formatProducts = (newProducts) => {
    for (let product of newProducts) {
      product.sizes = [];
      product.stock = {
        total: 0,
        bySize: product["product-stocks"],
      };
      product.stock.total = 0;
      product.description = {
        main: product.description_main,
        points: [],
      };

      for (let stock of product["product-stocks"]) {
        product.sizes.push(stock.size);
        product.stock.total += stock.numItems;
      }

      for (let point of product["product-descriptions"]) {
        product.description.points.push(point);
      }
    }
    setProducts(newProducts);
  };

  //Get Paginated Products
  const fetchProducts = async () => {
    await fetch(`${APIURL}/product/${page}/${limit}`)
      .then((res) => res.json())
      .then((json) => {
        setTotalProducts(json.total);
        if (products.length >= totalProducts) return;
        let newProducts = [...products, ...json.products];
        formatProducts(newProducts);
      })
      .catch(() => null);
  };

  useEffect(() => {
    fetchProducts();
  }, [sessionToken]);

  ///////////////////////////////////////////////////////////
  // SHOPPING CART (USING CONTEXT)
  ///////////////////////////////////////////////////////////
  const [cart, setCart] = useState({ products: [], subtotal: 0, numItems: 0 });
  const [numItems, setNumItems] = useState(0);

  const addToCart = (product, quantity) => {
    let tempCart = cart;

    if (tempCart.products.length >= 0) {
      for (let prod of tempCart.products) {
        if (
          prod.product.id === product.product.id &&
          prod.product.size === product.product.size
        ) {
          //update temp cart
          prod.quantity += quantity;
          tempCart.numItems += quantity;
          tempCart.subtotal += product.product.cost * quantity;

          setNumItems(tempCart.numItems);

          //set cart and local storage
          setCart(tempCart);
          localStorage.setItem("cart", JSON.stringify(tempCart));
          return;
        }
      }
    }

    //first item or item not found
    tempCart.products.push({ product: product.product, quantity });
    tempCart.numItems += quantity;
    tempCart.subtotal += product.product.cost * quantity;

    //set cart and local storage
    setNumItems(tempCart.numItems);
    localStorage.setItem("cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const removeFromCart = (product, quantity) => {
    let tempCart = cart;
    if (tempCart.products.length <= 0) return;

    let i = 0;
    for (let prod of tempCart.products) {
      if (
        prod.product.id === product.product.id &&
        prod.product.size === product.product.size
      ) {
        //update cart
        tempCart.numItems = tempCart.numItems - quantity;
        tempCart.subtotal -= product.product.cost * quantity;
        prod.quantity -= quantity;
        if (prod.quantity <= 0) tempCart.products.splice(i, 1);

        setNumItems(tempCart.numItems);
        setCart(tempCart);

        localStorage.setItem("cart", JSON.stringify(tempCart));
        return;
      }
      i++;
    }

    localStorage.setItem("cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const setProduct = (product, quantity) => {
    let tempCart = cart;
    if (tempCart.products.length <= 0) return;

    for (let prod of tempCart.products) {
      if (
        prod.product.id === product.product.id &&
        prod.product.size === product.product.size
      ) {
        let change = prod.quantity - quantity;

        if (change != 0) {
          //remove from cart
          tempCart.numItems = tempCart.numItems - change;
          tempCart.subtotal -= product.product.cost * change;
          prod.quantity -= change;
          setNumItems(tempCart.numItems);
          setCart(tempCart);
        } else {
          //do nothing qty equals
          return;
        }

        //set local storage
        localStorage.setItem("cart", JSON.stringify(tempCart));

        return;
      }
    }

    localStorage.setItem("cart", JSON.stringify(tempCart));
    setCart(tempCart);
  };

  const clearCart = async () => {
    let tempCart = { products: [], subtotal: 0, numItems: 0 };
    await setCart(tempCart);
    await setNumItems(0);
    await localStorage.setItem(
      "cart",
      JSON.stringify({ products: [], subtotal: 0, numItems: 0 })
    );
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
      <TokenContext.Provider
        value={{
          sessionToken,
          updateToken,
          clearToken,
          username,
          userEmail,
          isAdmin,
          adminView,
          setAdminView,
          toggleAdmin,
        }}
      >
        <CartContext.Provider
          value={{ cart, addToCart, removeFromCart, setProduct, clearCart }}
        >
          <ProductContext.Provider
            value={{
              products,
              nextPage,
              deleteProduct,
              updateProduct,
              updateProducts,
            }}
          >
            <Router>
              <ThemeProvider theme={theme}>
                <Navbar numItems={numItems} />
              </ThemeProvider>
            </Router>
          </ProductContext.Provider>
        </CartContext.Provider>
      </TokenContext.Provider>
    </div>
  );
}

export default App;
