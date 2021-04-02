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
  const [loading, setLoading] = useState(false);

  //context
  const { isAdmin, adminView, sessionToken } = useContext(TokenContext);

  const { products, fetchProducts } = useContext(ProductContext);

  //remove a product
  const deleteProduct = (e, id) => {
    e.preventDefault();
    setLoading(true);
    fetch(`${APIURL}/product/${id}`, {
      method: "DELETE",
      headers: new Headers({
        Authorization: sessionToken,
      }),
    })
      .then(async (res) => {
        //update products to display
        await fetchProducts();
        setLoading(false);
      })
      .catch((err) => setLoading(false));
  };

  useEffect(() => {
    fetchProducts();
  }, [products]);

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
                    onClick={(e) => history.push(`/product/${product.id}`)}
                  >
                    <img
                      className="product-image"
                      src={product.photoUrl}
                      alt="product-image"
                    />
                    <Typography>{product.name}</Typography>
                    <Typography>{`$${(product.cost / 100).toFixed(
                      2
                    )}`}</Typography>
                  </Grid>

                  {isAdmin && adminView ? (
                    <Grid item sm={12} md={12}>
                      <IconButton onClick={(e) => deleteProduct(e, product.id)}>
                        <DeleteIcon />
                      </IconButton>
                    </Grid>
                  ) : null}
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        {loading ? <CircularProgress /> : null}
        {isAdmin && adminView ? <AddProduct /> : null}
      </div>
    </div>
  );
};

export default Shop;
