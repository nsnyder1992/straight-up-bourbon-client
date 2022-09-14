let APIURL = "";
let host = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:13000";
    host = "http://localhost:3000";
    break;
  case "straight-up-bourbon.herokuapp.com":
    APIURL = "https://straight-up-bourbon-server-x89i.onrender.com";
    host = "https://localhost:3000/";
    break;
  default:
    break;
}

export default APIURL;
export const HOST = host;

//STRIPE
export const STIPE_KEY =
  "pk_test_51ITqSGDJCmDYfhc8cSzvK9zaZNMF9rgkoxZNslZHqolec8ovOVzXPkSIKdcopjsNXP5R9e9vS5Skidf9KMUM4mvh00D6JgoDwK";
