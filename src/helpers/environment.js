let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "straight-up-bourbon.herokuapp.com":
    APIURL = "https://straight-up-bourbon-server.herokuapp.com";
    break;
  default:
    break;
}

export default APIURL;

//YOUTUBE
export const CHANNEL_ID = "UCxwXL_8hCcTUhhRvx_eYE2g";
export const YOUTUBE_API_KEY = "AIzaSyAUHutqAE9n7FeMjxvgJlMvOZasGwKSngA";

//STRIPE
export const STIPE_KEY =
  "pk_test_51ITqSGDJCmDYfhc8cSzvK9zaZNMF9rgkoxZNslZHqolec8ovOVzXPkSIKdcopjsNXP5R9e9vS5Skidf9KMUM4mvh00D6JgoDwK";
