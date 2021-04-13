import { Typography } from "@material-ui/core";
import { useContext, useEffect } from "react";

//context
import { CartContext } from "../../../helpers/context/shopping-cart";

//Backend url
import APIURL from "../../../helpers/environment";

const Success = (props) => {
  let sessionId = new URLSearchParams(window.location.search).get("session_id");

  //context
  const { clearCart } = useContext(CartContext);

  useEffect(() => {
    clearCart();

    sessionId = sessionId.slice(0, sessionId.length - 1);

    // fetch(`${APIURL}/checkout/updateInventory`, {
    //   method: "POST",
    //   headers: {
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({ sessionId }),
    // }).catch((err) => console.log(err));
  }, []);

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
