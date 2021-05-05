import { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";

//material components
import {
  Typography,
  Grid,
  IconButton,
  CircularProgress,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

//components
import AddProduct from "../Admin/Products/AddProduct";

//context
import { TokenContext } from "../../helpers/context/token-context";
import { ProductContext } from "../../helpers/context/product-context";

//styles
import "./styles/Shop.css";

//helpers
import APIURL from "../../helpers/environment";

const Shop = () => {
  const history = useHistory();

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //context
  const { isAdmin, adminView, sessionToken, setAdminView } = useContext(
    TokenContext
  );
  const { products, deleteProduct } = useContext(ProductContext);

  //remove a product
  const removeProduct = async (e, product) => {
    e.preventDefault();
    setLoading(true);
    await fetch(`${APIURL}/product/${product.id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: sessionToken,
      }),
    })
      .then(() => {
        deleteProduct(product);
        setAdminView(false);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  //handle navigation product page
  const handleClick = (id) => {
    if (adminView)
      return setError("Disable Admin View to navigate to Product Page");
    history.push(`/product/${id}`);
  };

  //clear error on disabled admin view
  useEffect(() => {
    if (!adminView) setError("");
  }, [adminView]);

  return (
    <div className="content-shop">
      <div className="products">
        <Grid container spacing={3}>
          {products?.map((product, key) => {
            return (
              <Grid item sm={6} md={4} key={key}>
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

                  {isAdmin && adminView ? (
                    <Grid item sm={12} md={12}>
                      <IconButton onClick={(e) => removeProduct(e, product)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {error !== "" ? (
          <Typography color="secondary">{error}</Typography>
        ) : null}
        {loading ? <CircularProgress /> : null}
        {isAdmin && adminView ? <AddProduct /> : null}
      </div>
    </div>
  );
};

export default Shop;
