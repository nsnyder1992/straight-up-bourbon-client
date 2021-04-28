import { CardMedia, Divider, Typography } from "@material-ui/core";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";

//helpers
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";

const Order = () => {
  const { id } = useParams();

  const { sessionToken } = useContext(TokenContext);

  const [order, setOrder] = useState();
  const [isAuth, setIsAuth] = useState(false);
  const [totalCost, setTotalCost] = useState(0);

  useEffect(() => {
    fetch(`${APIURL}/order/${id}`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then(async (json) => {
        console.log(json);

        if (!json.auth) {
          setOrder(json);

          //rest total cost each time
          let tempCost = 0;
          for (let item of json.items.data) {
            tempCost += (item.product.cost / 100) * item.quantity;
          }
          setIsAuth(true);
          setTotalCost(tempCost);
        }
      })
      .catch((err) => console.log(err));
  }, [sessionToken]);

  return (
    <div>
      {isAuth ? (
        <div>
          <br />
          <Typography variant="h6">Customer Details</Typography>
          <br />
          <Typography>{order?.session?.shipping.name}</Typography>
          <br />
          <Typography>{order?.session?.customer_details.email}</Typography>
          <br />
          <Typography>{order?.session?.shipping.address.line1}</Typography>
          <br />
          {order?.session?.shipping.address.line2 !== null ? (
            <div>
              <Typography>{order?.session?.shipping.address.line2}</Typography>
              <br />
            </div>
          ) : null}

          <Typography>
            {order?.session?.shipping.address.city}
            {", "}
            {order?.session?.shipping.address.state}{" "}
            {order?.session?.shipping.address.postal_code}{" "}
          </Typography>
          <br />
          {order?.order.trackingNumber ? (
            <Typography>
              Tracking Number: {order?.order.trackingNumber}
            </Typography>
          ) : null}
          <br />
          <Divider />
          <br />
          <Typography variant="h6">Items</Typography>
          <br />
          {order?.items?.data.map((item, index) => {
            return (
              <div key={index}>
                <img
                  className="product-image"
                  src={item.product.photoUrl}
                  alt="product-image"
                />
                <Typography>{item.description}</Typography>
                <Typography>
                  Cost: ${(item.product.cost / 100).toFixed(2)}
                </Typography>
                <Typography>Qty: {item.quantity}</Typography>
              </div>
            );
          })}
          <br />
          <Divider />
          <br />
          <Typography>Total Cost: ${totalCost.toFixed(2)}</Typography>
        </div>
      ) : (
        <Typography>Not Authorized</Typography>
      )}
    </div>
  );
};

export default Order;
