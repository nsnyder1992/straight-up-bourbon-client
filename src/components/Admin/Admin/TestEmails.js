import {
  Button,
  CircularProgress,
  FormControl,
  Grid,
  InputLabel,
  makeStyles,
  Select,
  TextField,
  Typography,
  Box,
} from "@material-ui/core";
import { useContext, useState } from "react";
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const TestEmails = () => {
  //context
  const { sessionToken } = useContext(TokenContext);

  const classes = useStyles();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState();
  const [status, setStatus] = useState("Test");
  const [code, setCode] = useState("AC");

  const [msg, setMsg] = useState();
  const [error, setError] = useState();

  const handleSubmit = () => {
    const body = { email, status, code };

    setLoading(true);
    fetch(`${APIURL}/track/email/test/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json?.msg) setMsg(msg);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  const handleStatus = (event) => {
    setStatus(event.target.value);
  };

  const handleCode = (event) => {
    setCode(event.target.value);
  };

  return (
    <Grid container spacing={1} style={{ marginTop: 25 }}>
      <Grid item xs={3}>
        <TextField
          style={{ marginTop: 8 }}
          required
          id="email-input"
          label="Email Address"
          className="input-field"
          type="email"
          autoComplete="current-email"
          variant="outlined"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">Status</InputLabel>
          <Select
            native
            value={status}
            onChange={handleStatus}
            label="Status"
            inputProps={{
              name: "status",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={"Test"}>Test</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <FormControl variant="outlined" className={classes.formControl}>
          <InputLabel htmlFor="outlined-age-native-simple">
            Status Code
          </InputLabel>
          <Select
            native
            value={code}
            onChange={handleCode}
            label="Status Code"
            inputProps={{
              name: "code",
              id: "outlined-age-native-simple",
            }}
          >
            <option value={"AC"}>Tracking-Accepted</option>
            <option value={"IT"}>Tracking-Transit</option>
            <option value={"DE"}>Tracking-Delivered</option>
            <option value={"EX"}>Tracking-Error</option>
            <option value={"UN"}>Tracking-Unknown</option>
            <option value={"AT"}>Tracking-Attempt</option>
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={3}>
        <Button
          style={{ minWidth: 175, marginTop: 15 }}
          variant="contained"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? <CircularProgress /> : "Send Email"}
        </Button>
      </Grid>
      <Grid item xs={12}>
        {msg ? <Typography>{msg}</Typography> : null}
        {error ? <Typography color="secondary">{error}</Typography> : null}
      </Grid>
    </Grid>
  );
};

export default TestEmails;
