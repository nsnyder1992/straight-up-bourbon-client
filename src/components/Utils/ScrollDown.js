import { useEffect, useState } from "react";
import clsx from "clsx";

import { Box, makeStyles, Typography } from "@material-ui/core";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";

const animeTime = 0.9;
const animeMovement = 0.1;

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "calc(100vh - 60px)",
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
    bottom: 40,
    zIndex: 999,
    width: "100vw",
    animation: "500ms ease-in-out 1s normal none 1 running fadeInDown",
  },
  animatedText: {
    animation: `$arrowAnimation ${animeTime}s infinite alternate ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes textAnimation": {
    "0%": { opacity: 0.4 },
    "100%": { opacity: 0.9 },
  },
  animatedArrow: {
    animation: `$arrowAnimation ${animeTime}s infinite alternate ${theme.transitions.easing.easeInOut}`,
  },
  "@keyframes arrowAnimation": {
    "0%": { transform: `translateY(-${animeMovement}em)`, opacity: 0.4 },
    "100%": { transform: "translateY(0)", opacity: 0.9 },
  },
}));

const ScrollDown = ({ refStopper }) => {
  const classes = useStyles();
  const [visable, setVisable] = useState(false);

  useEffect(() => {
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

    setVisable(scrollTop > heightToHide);
  };

  const getOffset = (element) => {
    const elementRect = element.getBoundingClientRect();
    return elementRect?.top;
  };

  return (
    <div
      className={visable ? classes.overlayEnd : classes.sticky}
      ref={refStopper}
    >
      <Box
        height="100%"
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        color="#fff"
      >
        <Typography
          style={{ marginBottom: 0 }}
          className={
            visable
              ? null
              : clsx(classes.animatedText, {
                  [classes.textAnimation]: !visable,
                })
          }
        >
          Scroll Down
        </Typography>
        <KeyboardArrowDownIcon
          style={{ fontSize: 40 }}
          className={
            visable
              ? null
              : clsx(classes.animatedArrow, {
                  [classes.arrowAnimation]: !visable,
                })
          }
        />
      </Box>
    </div>
  );
};

export default ScrollDown;
