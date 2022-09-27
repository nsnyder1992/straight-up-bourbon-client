import {
  Box,
  Button,
  CircularProgress,
  Grid,
  TextField,
  Typography,
} from "@material-ui/core";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import APIURL from "../../helpers/environment";

const ContactUs = () => {
  const captchaRef = useRef(null);

  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [message, setMessage] = useState();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [msg, setMsg] = useState();

  const clear = () => {
    setName();
    setEmail();
    setMessage();
  };

  const handleSubmit = () => {
    if (!email) return setError("Must submit a email");
    if (!message) return setError("Must submit a message");
    const token = captchaRef.current.getValue();
    captchaRef.current.reset();

    setError();
    setMsg();

    setLoading(true);
    fetch(`${APIURL}/contact`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({ name, email, message, token }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json?.err) {
          setError(json?.err);
          setLoading(false);
          return;
        }
        if (json?.msg) return setMsg(json?.msg);
        clear();
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="content-home">
      <div className="videos">
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              multiline
              id="name-input"
              label="Name"
              className="input-field"
              type="name"
              autoComplete="current-name"
              variant="outlined"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              id="email-input"
              label="Email"
              className="input-field"
              type="email"
              autoComplete="current-email"
              variant="outlined"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              multiline
              id="message-input"
              label="Message"
              className="input-field"
              type="message"
              autoComplete="current-message"
              variant="outlined"
              onChange={(e) => setMessage(e.target.value)}
              value={message}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" justifyContent="center">
              <ReCAPTCHA
                sitekey={process.env.REACT_APP_SITE_KEY}
                ref={captchaRef}
              />
            </Box>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
              {loading ? <CircularProgress color="white" /> : "Submit"}
            </Button>
          </Grid>
          <Grid item xs={12}>
            {error ? <Typography color="secondary">{error}</Typography> : null}
            {msg ? <Typography>{msg}</Typography> : null}
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ContactUs;
