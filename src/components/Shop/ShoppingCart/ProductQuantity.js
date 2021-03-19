import { useState } from "react";

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
  },
});

const ProductQuantity = ({ product, addToCart, removeFromCart, index }) => {
  const classes = useStyles();

  //local states
  const [qty, setQty] = useState(product.qty);

  const addOne = () => {
    let tempProduct = JSON.parse(JSON.stringify(product));
    tempProduct.qty = 1;
    addToCart(tempProduct);

    setQty(qty + 1);
  };

  const removeOne = () => {
    if (product.qty > 0) {
      let tempProduct = JSON.parse(JSON.stringify(product));
      tempProduct.qty -= 1;
      removeFromCart(tempProduct, index);

      setQty(qty - 1);
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
      product.qty = qty;
      setQty(qty);
      return;
    }

    //if number change to entered qty
    product.qty = value;
    setQty(value);
  };

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
        <div className="icon-button icon-button-right" onClick={addOne}>
          <AddIcon id="add-icon" className={classes.button} />
        </div>
      </div>
      <Typography variant="caption">{`$${product.cost}.00`}</Typography>
    </div>
  );
};

export default ProductQuantity;
