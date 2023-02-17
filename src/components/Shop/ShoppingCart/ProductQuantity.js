import { useEffect, useState } from "react";

//material components
import { Typography } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";

//material styles
import { makeStyles } from "@material-ui/core/styles";

//styles
import "./styles/ProductQuantity.css";

const useStyles = makeStyles({
  underline: {
    "&&&:before": {
      borderBottom: "none",
    },
    "&&:after": {
      borderBottom: "none",
    },
  },
  button: {
    cursor: "pointer",
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  buttonDisabled: {
    cursor: "auto",
    display: "flex",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#a09f9f",
  },
});

const ProductQuantity = ({
  product,
  setRefresh,
  addToCart,
  removeFromCart,
  setProduct,
  index,
  error,
  setError,
}) => {
  const classes = useStyles();

  //local states
  const [qty, setQty] = useState(product.quantity);
  const [stock, setStock] = useState();

  const addOne = () => {
    let tempProduct = JSON.parse(JSON.stringify(product));
    if (qty < stock) {
      addToCart(tempProduct, 1);
      setQty(qty + 1);
    } else {
      setError("Not enough stock. " + stock + " left");
    }
    setRefresh(true);
  };

  const removeOne = () => {
    if (product.quantity > 0) {
      let tempProduct = JSON.parse(JSON.stringify(product));

      removeFromCart(tempProduct, 1, index);

      setQty(qty - 1);
      setRefresh(true);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;

    //check if null if so set to 0
    if (value === "") value = 0;

    //turn to integer
    value = parseInt(value);

    //if couldn't turn to int set to last qty
    if (isNaN(value)) {
      product.quantity = qty;
      setQty(qty);
      setRefresh(true);
      return;
    }

    //if value is less than or equal to stock set qty and product
    if (value <= stock) {
      setQty(value);
      setProduct(product, value);
    } else {
      setError("Not enough stock. " + stock + " left");
    }
    setRefresh(true);
  };

  useEffect(() => {
    let tempProduct = JSON.parse(JSON.stringify(product));

    let size = tempProduct?.product?.size;

    if (size && tempProduct?.product?.stock?.bySize) {
      for (let stockIndex in tempProduct?.product?.stock?.bySize) {
        if (tempProduct?.product?.stock?.bySize[stockIndex]?.size == size) {
          setStock(tempProduct?.product?.stock?.bySize[stockIndex]?.numItems);
          break;
        }
      }
    }
  }, [product]);

  useEffect(() => {
    if (qty <= stock && error) setError();
  }, [qty]);

  return (
    <div className="quantity-container-sc">
      <div className="quantity">
        <div className="icon-button icon-button-left" onClick={removeOne}>
          <RemoveIcon id="remove-icon" className={classes.button} />
        </div>

        <TextField
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          InputProps={{ classes }}
          value={qty}
          onChange={handleChange}
        />
        <div className="icon-button-right icon-button" onClick={addOne}>
          <AddIcon
            id="add-icon"
            className={qty < stock ? classes.button : classes.buttonDisabled}
          />
        </div>
      </div>
      <div className="cost">
        <Typography variant="body2">
          ${(product.product.cost / 100).toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};

export default ProductQuantity;
