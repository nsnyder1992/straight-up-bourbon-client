//material components
import { Box, Typography } from "@material-ui/core";

//images
import logo_background_resize from "../../images/logo_background_resize.jpg";
import MetaPage from "../../MetaPage";

const About = () => {
  return (
    // <Box
    //   display="flex"
    //   flexDirection="column"
    //   justifyContent="center"
    //   alignItems="center"
    //   margin={0}
    //   marginBottom={50}
    // >
    //   <div className="background-container">
    //     <img
    //       style={{ maxWidth: 750, width: "100%" }}
    //       src={logo_background_resize}
    //       alt="logo"
    //     />
    //   </div>
    //   <Typography variant="h4">About</Typography>

    //   <Typography
    //     style={{ maxWidth: 750 }}
    //     variant="body1"
    //     component="p"
    //     align="left"
    //     paragraph
    //   >
    //     Straight Up Bourbon is a place for bourbon enthusiasts to learn more
    //     about their favorite spirit. Whether you are a master taster or just
    //     stepping into the world of whiskey, we work to produce content that
    //     everyone can enjoy.
    //   </Typography>
    // </Box>
    <MetaPage path={"/about"} />
  );
};

export default About;
