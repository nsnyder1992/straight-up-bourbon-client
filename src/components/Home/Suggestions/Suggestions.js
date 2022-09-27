import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../../helpers/context/token-context";
import APIURL from "../../../helpers/environment";
import SwipeableViews from "react-swipeable-views";
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  CircularProgress,
  Grid,
  Hidden,
  makeStyles,
  MobileStepper,
  Paper,
  Typography,
  useTheme,
} from "@material-ui/core";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { red } from "@material-ui/core/colors";
import Suggestion from "./Suggestion";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  rootMdUp: {
    maxWidth: 900,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
}));

const Suggestions = () => {
  const classes = useStyles();

  const theme = useTheme();

  //context
  const { sessionToken } = useContext(TokenContext);

  //states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [suggestions, setSuggestions] = useState([]);
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(0);
  const [offset, setOffset] = useState(2);

  const fetchData = () => {
    setLoading(true);
    fetch(`${APIURL}/bourbon/selections`, {
      method: "GET",
      headers: new Headers({
        "content-type": "application/json",
        authorization: sessionToken,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        setLoading(false);
        if (json?.err) {
          return setError(json.err);
        }
        setSuggestions(json.bourbons);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [sessionToken]);

  const handleNext = (offset) => {
    setActive((prevActiveStep) => prevActiveStep + offset);
    setPage((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = (offset) => {
    setActive((prevActiveStep) => prevActiveStep - offset);
    setPage((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActive(step);
  };

  return (
    <>
      <Hidden only={["md", "lg", "xl"]}>
        <Paper className={classes.root}>
          {loading ? <CircularProgress /> : null}
          {error ? <Typography color="secondary">{error}</Typography> : null}
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={active}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {suggestions?.map((suggestion, index) => {
              return (
                <div>
                  {Math.abs(active - index) <= 2 ? (
                    <Suggestion
                      key={suggestions[active].id}
                      suggestion={suggestions[active]}
                      classes={classes}
                    />
                  ) : null}
                </div>
              );
            })}
          </SwipeableViews>
          <MobileStepper
            variant="dots"
            steps={suggestions?.length}
            position="static"
            activeStep={active}
            nextButton={
              <Button
                size="small"
                onClick={() => handleNext(1)}
                disabled={active === suggestions?.length - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => handleBack(1)}
                disabled={active === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Paper>
      </Hidden>
      <Hidden mdDown>
        <Paper className={classes.rootMdUp}>
          {loading ? <CircularProgress /> : null}
          {error ? <Typography color="secondary">{error}</Typography> : null}

          <Grid container>
            {suggestions?.map((suggestion, index) => {
              if (index >= active && index < active + offset)
                return (
                  <Grid
                    item
                    xs={
                      suggestions.length % 2 != 0 &&
                      suggestions.length - 1 == active
                        ? 12
                        : 6
                    }
                  >
                    <Suggestion
                      key={suggestion.id}
                      suggestion={suggestion}
                      classes={classes}
                    />
                  </Grid>
                );
            })}
          </Grid>
          <MobileStepper
            variant="dots"
            steps={Math.ceil(suggestions?.length / offset)}
            position="static"
            activeStep={page}
            nextButton={
              <Button
                size="small"
                onClick={() => handleNext(offset)}
                disabled={
                  active === Math.ceil(suggestions?.length / offset) - 1
                }
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={() => handleBack(offset)}
                disabled={active === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Paper>
      </Hidden>
    </>
  );
};

export default Suggestions;
