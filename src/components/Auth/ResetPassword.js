import { useContext, useState } from "react";
import { useHistory, useParams } from "react-router-dom";

//material components
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, CircularProgress } from "@material-ui/core";

//context
import { TokenContext } from "../../helpers/context/token-context";

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

const ResetPassword = () => {
  const history = useHistory();

  //get parameter from url query
  const { token } = useParams();

  //styles
  const classes = useStyles();

  //context
  const { updateToken } = useContext(TokenContext);

  //states
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Login user
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${APIURL}/user/updatePasswordViaEmail`, {
      method: "PUT",
      body: JSON.stringify({
        password: password,
        resetPasswordToken: token,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then(async (data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        await updateToken(data?.sessionToken, data.user);
        history.push("/profile");
      })
      .catch(() => setLoading(false));
  };

  return (
    <div className="account-fields">
      <Typography className="form-title" variant="h4">
        RESET PASSWORD
      </Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          id="outlined-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
          variant="outlined"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? <CircularProgress size={25} color="inherit" /> : "RESET"}
        </Button>
      </form>
      {error ? <Typography color="secondary">{error}</Typography> : null}
    </div>
  );
};

export default ResetPassword;
