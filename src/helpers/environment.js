let APIURL = "";

switch (window.location.hostname) {
  case "localhost":
  case "127.0.0.1":
    APIURL = "http://localhost:3000";
    break;
  case "njs-straightupbourbon.herokuapp.com":
    APIURL = "https://njs-straightupbourbon-server.herokuapp.com";
}

export default APIURL;
