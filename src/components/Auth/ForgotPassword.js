import { useState } from "react";

//material components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";

//get API url
import APIURL from "../../helpers/environment";

//styles
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    "& .MuiButton-root": {
      margin: theme.spacing(1),
      width: "27.5ch",
    },
  },
}));

const ForgotPassword = ({ toggleForgotPassword }) => {
  //styles
  const classes = useStyles();

  //states
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Login user
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${APIURL}/user/forgotPassword`, {
      method: "POST",
      body: JSON.stringify({ email: email }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setLoading(false);
        toggleForgotPassword(event);
      })
      .catch((err) => {
        setError(err.error);
        setLoading(false);
      });
  };

  return (
    <div className="account-fields">
      <Typography className="form-title" variant="h4">
        Forgot Password
      </Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue="username"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <CircularProgress size={25} color="inherit" />
          ) : (
            "SEND EMAIL"
          )}
        </Button>
      </form>
      {error ? <Typography color="secondary">{error}</Typography> : null}
    </div>
  );
};

export default ForgotPassword;
