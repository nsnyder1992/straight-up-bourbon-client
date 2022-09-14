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

const ProductQuantity = ({ quantity, setQuantity, stock, outOfStock }) => {
  const classes = useStyles();

  const addOne = () => {
    if (quantity < stock && !outOfStock) setQuantity(quantity + 1);
  };

  const removeOne = () => {
    if (quantity > 1 && !outOfStock) setQuantity(quantity - 1);
  };

  const handleChange = (e) => {
    let value = e.target.value;

    //check if null if so set to 0
    if (value === "" || value === "0") return setQuantity(quantity);

    //turn to integer
    value = parseInt(value);

    //if couldn't turn to int set to last qty
    if (isNaN(value)) return setQuantity(quantity);

    //if number change to entered qty
    if (value <= stock) setQuantity(value);
  };

  return (
    <div className="quantity-container">
      <Typography variant="body2">QUANTITY</Typography>
      <div className="quantity">
        <div className="icon-button icon-button-left" onClick={removeOne}>
          <RemoveIcon
            id="remove-icon"
            className={!outOfStock ? classes.button : classes.buttonDisabled}
          />
        </div>

        <TextField
          inputProps={{ min: 0, style: { textAlign: "center" } }}
          InputProps={{ classes }}
          value={quantity}
          onChange={handleChange}
          disabled={outOfStock}
        />
        <div className="icon-button icon-button-right" onClick={addOne}>
          <AddIcon
            id="add-icon"
            className={
              quantity < stock && !outOfStock
                ? classes.button
                : classes.buttonDisabled
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProductQuantity;
