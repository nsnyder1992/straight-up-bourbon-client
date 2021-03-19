//material components
import { Typography } from "@material-ui/core";

//images
import logo_background_resize from "../../images/logo_background_resize.jpg";

//styles
import "./styles/About.css";

const About = () => {
  return (
    <div className="content">
      <div className="background-container">
        <img src={logo_background_resize} alt="logo" />
      </div>
      <Typography variant="h4">About</Typography>
      <div className="text">
        <Typography variant="body1" component="p" align="left" paragraph>
          Is a channel about bourbon, for bourbon lovers, made by bourbon
          lovers.
        </Typography>
      </div>
    </div>
  );
};

export default About;
