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
  const [qty, setQty] = useState(product.quantity);

  const addOne = () => {
    let tempProduct = JSON.parse(JSON.stringify(product));
    addToCart(tempProduct, 1);

    setQty(qty + 1);
  };

  const removeOne = () => {
    if (product.quantity > 0) {
      let tempProduct = JSON.parse(JSON.stringify(product));
      removeFromCart(tempProduct, 1, index);

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
      product.quantity = qty;
      setQty(qty);
      return;
    }

    //if number change to entered qty
    product.quantity = value;
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
      <div className="cost">
        <Typography variant="body2">
          ${(product.product.cost / 100).toFixed(2)}
        </Typography>
      </div>
    </div>
  );
};

export default ProductQuantity;
