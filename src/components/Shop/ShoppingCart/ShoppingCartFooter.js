//material ui components
import { Typography, Divider, Grid, Button } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//Backend url
import APIURL, { STIPE_KEY } from "../../../helpers/environment";

const ShoppingCartFooter = ({ cart }) => {
  const { sessionToken } = useContext(TokenContext);
  const [stripe, setStripe] = useState();

  const fetchCheckoutSession = () => {
    const body = {
      products: cart.products,
      currency: "usd",
    };

    let fetchContent = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    };

    if (sessionToken) fetchContent.headers.authorization = sessionToken;

    return fetch(`${APIURL}/checkout/create`, fetchContent)
      .then((res) => res.json())
      .catch(() => null);
  };

  const asyncLoad = async () => {
    const stripeLoad = await loadStripe(STIPE_KEY);
    setStripe(stripeLoad);
  };

  useEffect(() => {
    asyncLoad();
  }, []);

  const handleCheckout = async () => {
    const { sessionId } = await fetchCheckoutSession();

    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <div className="cart-footer">
      <Divider />
      <div className="pay-section">
        <Grid container spacing={0}>
          <Grid item xs={12}>
            <Typography variant="body2">
              Subtotal: ${(cart.subtotal / 100).toFixed(2)}
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
