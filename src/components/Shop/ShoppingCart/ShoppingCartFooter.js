//material ui components
import { Typography, Divider, Grid, Button } from "@material-ui/core";

const ShoppingCartFooter = ({ cart }) => {
  const handleCheckout = () => {
    console.log("checkout");
  };

  return (
    <div className="cart-footer">
      <Divider />
      <div className="pay-section">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="body2">
              Subtotal: ${cart.subtotal}.00
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="caption">
              Shipping, taxes, and discount codes calculated at checkout.
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              id="pay-button"
              onClick={handleCheckout}
            >
              Check Out
            </Button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ShoppingCartFooter;
