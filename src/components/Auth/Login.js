import { useContext, useState } from "react";
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

const Login = () => {
  //styles
  const classes = useStyles();

  //context
  const { updateToken } = useContext(TokenContext);

  //states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //Login user
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${APIURL}/user/login`, {
      method: "POST",
      body: JSON.stringify({ username: username, password: password }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        updateToken(data?.sessionToken, data.user.id);
      })
      .catch((err) => setLoading(false));
  };

  return (
    <div className="account-fields">
      <Typography className="form-title" variant="h4">
        LOGIN
      </Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          required
          id="outlined-required"
          label="Required"
          defaultValue="username"
          variant="outlined"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
        />
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
          {loading ? <CircularProgress size={25} color="inherit" /> : "LOGIN"}
        </Button>
      </form>
      {error ? <Typography color="secondary">{error}</Typography> : null}
    </div>
  );
};

export default Login;
