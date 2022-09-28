import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import PayPalDonate from "../../Utils/PayPalDonate";
import TextDivider from "../../Utils/TextDivider";
import LinkButton from "../../Utils/LinkButton";
import Video from "./Video";
import { useEffect, useRef, useState } from "react";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100vh",
    position: "relative",
    "& video": {
      objectFit: "cover",
    },
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  overlayEnd: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0)",
  },
  title: {
    paddingBottom: theme.spacing(4),
  },
  sticky: {
    position: "fixed",
    bottom: 50,
    zIndex: 999,
    width: "100%",
    animation: "500ms ease-in-out 1s normal none 1 running fadeInDown",
  },
}));

const BackgroundVideo = ({ title, description, image, link }) => {
  const classes = useStyles();
  const [visable, setVisable] = useState(false);

  const refStopper = useRef();

  useEffect(() => {
    console.log(refStopper);
    if (!refStopper?.current) return;
    window.addEventListener("scroll", isSticky);
    return () => {
      window.removeEventListener("scroll", isSticky);
    };
  }, [refStopper]);

  const isSticky = (e) => {
    const heightToHide = getOffset(refStopper.current);

    const scrollTop =
      document.body.scrollTop || document.documentElement.scrollTop;

    console.log(scrollTop, heightToHide);
    setVisable(scrollTop > heightToHide);
  };

  const getOffset = (element) => {
    console.log(element.getBoundingClientRect());
    const elementRect = element.getBoundingClientRect();
    return elementRect?.top;
  };

  return (
    <section className={classes.root} ref={refStopper}>
      <Video />
      <div className={classes.overlay}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography variant="h3" component="h1" className={classes.title}>
            {title ? title : "Good Friends. Good Bourbon."}
          </Typography>
          <LinkButton link={link} variant="contained">
            {description ? description : "Monthly Support"}
          </LinkButton>
          <TextDivider>OR</TextDivider>
          <PayPalDonate
            variant="contained"
            style={{ minWidth: "250px", fontSize: "1.15rem" }}
          />
        </Box>
      </div>
      {/* className={classes.overlayEnd} */}
      <div className={visable ? classes.overlayEnd : classes.sticky}>
        <Box
          height="100%"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          color="#fff"
        >
          <Typography style={{ marginBottom: 0 }}>Scroll Down</Typography>
          <KeyboardArrowDownIcon style={{ fontSize: 40 }} />
        </Box>
      </div>
    </section>
  );
};

export default BackgroundVideo;
