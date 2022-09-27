import { Button } from "@material-ui/core";

const YouTubeSubscribe = ({ variant = "outlined", color = "primary" }) => {
  return (
    <Button
      variant={variant}
      color={color}
      target="blank"
      href={
        "https://www.youtube.com/channel/UCxwXL_8hCcTUhhRvx_eYE2g/?sub_confirmation=1"
      }
    >
      Subscribe
    </Button>
  );
};

export default YouTubeSubscribe;
