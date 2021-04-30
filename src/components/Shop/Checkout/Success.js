import { Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";
import { Redirect, useHistory } from "react-router";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

const Success = (props) => {
  const history = useHistory();

  let sessionId = new URLSearchParams(window.location.search).get("session_id");
  let redirect = new URLSearchParams(window.location.search).get("redirect");

  //context
  const { removeFromCart, cart, clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();

    console.log("USE EFFECT");
    for (let product of cart.products) {
      console.log("Produt: ", product);
    }

    sessionId = sessionId.slice(0, sessionId.length - 1);
  }, []);

  if (!redirect) {
    window.location.href = window.location.href + "&redirect=true";
  }
  return (
    <div>
      <Typography variant="h6" style={{ margin: 20 }}>
        We appreciate your business!
      </Typography>
      <Typography style={{ margin: 20 }}>
        If you have any questions, please email{" "}
        <a href="mailto:straightupbourbon.channel@gmail.com">
          straightupbourbon.channel@gmail.com
        </a>
        !
      </Typography>
    </div>
  );
};

export default Success;
