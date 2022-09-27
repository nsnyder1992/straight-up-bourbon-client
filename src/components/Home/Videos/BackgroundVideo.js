import { Box, Button, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

import ReactPlayer from "react-player";

import introVideo from "../../videos/web_intro.mp4";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    height: "80vh",
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
}));

const BackgroundVideo = ({ title, description, image, link }) => {
  const classes = useStyles();

  return (
    <section className={classes.root}>
      <ReactPlayer
        url={image ? image : introVideo}
        playing
        loop
        muted
        width="100%"
        height="100%"
      />
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
            {title}
          </Typography>
          <Button
            href={link}
            target="blank"
            color="primary"
            variant="contained"
            style={{ minWidth: "250px", fontSize: "1.15rem" }}
          >
            {description}
          </Button>
        </Box>
      </div>
      <div className={classes.overlayEnd}>
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
