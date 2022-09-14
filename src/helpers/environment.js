let APIURL = "";
let host = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
  default:
    APIURL = process.env.REACT_APP_API_HOST;
    host = process.env.REACT_APP_SELF_HOST;
    break;
}

export default APIURL;
export const HOST = host;

//STRIPE
export const STIPE_KEY = process.env.REACT_APP_STRIPE_KEY;
