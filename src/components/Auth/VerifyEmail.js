import {
  Box,
  CircularProgress,
  Grid,
  Link,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import APIURL from "../../helpers/environment";

const VerifyEmail = () => {
  const history = useHistory();

  //get parameter from url query
  const { token } = useParams();

  const [oldToken, setOldToken] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const sendVerification = () => {
    setLoading(true);
    fetch(`${APIURL}/user/verify`, {
      method: "POST",
      body: JSON.stringify({
        verifyToken: token,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        history.push("/profile");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const handleResend = () => {
    setLoading(true);
    fetch(`${APIURL}/user/verify/resend`, {
      method: "POST",
      body: JSON.stringify({
        verifyToken: token,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        history.push("/verify");
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    if (token && token != oldToken) {
      sendVerification();
      setOldToken(token);
    }
  }, [token]);

  return (
    <Grid container justifyContent="center">
      <Box display="flex" flexDirection="column" margin={5}>
        {loading ? <CircularProgress /> : null}
        {error ? <Typography color="secondary">{error}</Typography> : null}

        {token ? (
          error == "Token Expired." ? (
            <Link onClick={handleResend}>Resend Token</Link>
          ) : (
            <Typography>Verifying User</Typography>
          )
        ) : (
          <Typography>
            We sent and email to your provided email address. Please verify
            email by clicking the link provided. Then come back here to sign in!
            Thanks!
          </Typography>
        )}
      </Box>
    </Grid>
  );
};

export default VerifyEmail;
