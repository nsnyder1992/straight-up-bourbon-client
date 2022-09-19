import { Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

const Success = () => {
  let redirect = new URLSearchParams(window.location.search).get("redirect");

  //context
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();
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
        <a href="mailto:straightupbourbon@gmail.com">
          straightupbourbon@gmail.com
        </a>
        !
      </Typography>
    </div>
  );
};

export default Success;
