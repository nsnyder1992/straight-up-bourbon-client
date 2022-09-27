import { Box, Hidden, Typography } from "@material-ui/core";
import LinkButton from "../Utils/LinkButton";

const BourbonFund = () => {
  return (
    <>
      <Hidden smDown>
        <Box display={"flex"} flexDirection="row" justifyContent={"center"}>
          <Box margin={3}>
            <Typography variant="h6" style={{ margin: 5 }}>
              Monthly Subscription
            </Typography>
            <LinkButton
              link={"https://www.patreon.com/straightupbourbon"}
              variant="contained"
            >
              Patreon
            </LinkButton>
          </Box>
          <Box margin={3}>
            <Typography variant="h6" style={{ margin: 5 }}>
              One Time Tip
            </Typography>
            <LinkButton
              link={
                "https://www.paypal.com/donate/?hosted_button_id=HKELG2HW6ZNL4"
              }
              variant="contained"
              margin={3}
            >
              Paypal
            </LinkButton>
          </Box>
        </Box>
      </Hidden>
      <Hidden only={["md", "lg", "xl"]}>
        <Box display={"flex"} flexDirection="column" justifyContent={"center"}>
          <Box margin={"10px 0px"}>
            <Typography variant="h6" style={{ margin: 5 }}>
              Monthly Subscription
            </Typography>
            <LinkButton
              link={"https://www.patreon.com/straightupbourbon"}
              variant="contained"
            >
              Patreon
            </LinkButton>
          </Box>
          <Box margin={"10px 0px"}>
            <Typography variant="h6" style={{ margin: 5 }}>
              One Time Tip
            </Typography>
            <LinkButton
              link={
                "https://www.paypal.com/donate/?hosted_button_id=HKELG2HW6ZNL4"
              }
              variant="contained"
              margin={3}
            >
              Paypal
            </LinkButton>
          </Box>
        </Box>
      </Hidden>
    </>
  );
};

export default BourbonFund;
