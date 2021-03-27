let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "ljn-straightupbourbon.herokuapp.com":
    APIURL = "https://ljn-straightupbourbon-server.herokuapp.com";
}

export default APIURL;

//YOUTUBE
export const CHANNEL_ID = "UCxwXL_8hCcTUhhRvx_eYE2g";
export const YOUTUBE_API_KEY = "AIzaSyAUHutqAE9n7FeMjxvgJlMvOZasGwKSngA";
