import { useState, useContext, useRef, useEffect } from "react";
import { useHistory } from "react-router-dom";

//material components
import {
  Typography,
  Grid,
  CircularProgress,
  Switch,
  FormControlLabel,
} from "@material-ui/core";
//components
import AddProduct from "../Admin/Products/AddProduct";

//context
import { TokenContext } from "../../helpers/context/token-context";
import { ProductContext } from "../../helpers/context/product-context";

//styles
import "./styles/Shop.css";

//helpers
import APIURL from "../../helpers/environment";
import ScrollDown from "../Utils/ScrollDown";

const Shop = () => {
  const history = useHistory();

  const refStopper = useRef();

  //states
  const [showDeactive, setShowDeactive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //context
  const { isAdmin, adminView, sessionToken, setAdminView } =
    useContext(TokenContext);
  const { products, setProducts } = useContext(ProductContext);

  const handleDeactive = (e) => {
    setShowDeactive(e.target.checked);
  };

  //handle navigation product page
  const handleClick = (id) => {
    // if (adminView)
    //   return setError("Disable Admin View to navigate to Product Page");
    history.push(`/product/${id}`);
  };

  //clear error on disabled admin view
  useEffect(() => {
    if (!adminView) setError("");
  }, [adminView]);

  return (
    <div className="content-shop">
      <div className="products">
        {isAdmin && adminView ? (
          <FormControlLabel
            value="top"
            control={
              <Switch
                color="primary"
                checked={showDeactive}
                onChange={handleDeactive}
              />
            }
            label="De-active Products"
            labelPlacement="Right"
          />
        ) : null}
        <Grid container spacing={3}>
          {products?.map((product, key) => {
            return product.isActive || showDeactive ? (
              <Grid item sm={12} key={key}>
                <Grid container spacing={0}>
                  <Grid
                    item
                    sm={12}
                    md={12}
                    className="product"
                    onClick={() => handleClick(product.id)}
                  >
                    <img
                      className="product-image"
                      src={product.photoUrl}
                      alt="product"
                    />
                    <Typography>{product.name}</Typography>
                    <Typography>{`$${(product.cost / 100).toFixed(
                      2
                    )}`}</Typography>
                  </Grid>
                </Grid>
              </Grid>
            ) : null;
          })}
        </Grid>
        {error !== "" ? (
          <Typography color="secondary">{error}</Typography>
        ) : null}
        {loading ? <CircularProgress /> : null}
        {isAdmin && adminView ? <AddProduct /> : null}
      </div>
      <ScrollDown refStopper={refStopper} />
      <div ref={refStopper}></div>
    </div>
  );
};

export default Shop;
