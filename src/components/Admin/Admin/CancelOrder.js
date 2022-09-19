import { useContext, useState } from "react";
import {
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";

import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";

const CancelOrder = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState();
  const [stripeId, setStripeId] = useState();

  const [msg, setMsg] = useState();
  const [error, setError] = useState();

  const handleSubmit = () => {
    const body = { stripeId };

    setLoading(true);
    fetch(`${APIURL}/order/admin/cancel/${id}`, {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify(body),
    })
      .then((res) => console.log(res))
      .then((json) => {
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err);
      });
  };

  return (
    <Grid container spacing={1} style={{ marginTop: 25 }}>
      <Grid item xs={4}>
        <TextField
          // style={{ marginTop: 8 }}
          required
          id="id-input"
          label="Order Id"
          className="input-field"
          type="name"
          autoComplete="current-id"
          variant="outlined"
          onChange={(e) => setId(e.target.value)}
          value={id}
        />
      </Grid>
      <Grid item xs={4}>
        <TextField
          // style={{ marginTop: 8 }}
          required
          id="stripeId-input"
          label="Stripe Id"
          className="input-field"
          type="name"
          autoComplete="current-stripeId"
          variant="outlined"
          onChange={(e) => setStripeId(e.target.value)}
          value={stripeId}
        />
      </Grid>
      <Grid item xs={4}>
        <Button
          style={{ minWidth: 175, marginTop: 8 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Cancel Order"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {msg ? <Typography>{msg}</Typography> : null}
        {error ? <Typography color="secondary">{error}</Typography> : null}
      </Grid>
    </Grid>
  );
};

export default CancelOrder;
