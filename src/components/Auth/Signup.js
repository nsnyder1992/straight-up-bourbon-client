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

const Signup = () => {
  //styles
  const classes = useStyles();

  //context
  const { updateToken } = useContext(TokenContext);

  //states
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  //create user
  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    fetch(`${APIURL}/user/signup`, {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        if (data.error) return setError(data.error);
        updateToken(data.sessionToken, data.user);
      })
      .catch(() => null);
  };

  return (
    <div className="account-fields">
      <Typography className="form-title" variant="h4">
        CREATE ACCOUNT
      </Typography>
      <form className={classes.root} noValidate onSubmit={handleSubmit}>
        <TextField
          id="outlined"
          label="First Name"
          defaultValue="First Name"
          variant="outlined"
          onChange={(e) => setFirstName(e.target.value)}
          value={firstName}
        />
        <TextField
          id="outlined"
          label="Last Name"
          defaultValue="Last Name"
          variant="outlined"
          onChange={(e) => setLastName(e.target.value)}
          value={lastName}
        />
        <TextField
          required
          id="outlined-required"
          label="Email"
          defaultValue="Email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <TextField
          required
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
          {loading ? <CircularProgress size={25} color="inherit" /> : "CREATE"}
        </Button>
      </form>
      {error ? <Typography color="secondary">{error}</Typography> : null}
    </div>
  );
};

export default Signup;
