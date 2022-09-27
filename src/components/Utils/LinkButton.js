import { Button } from "@material-ui/core";

const LinkButton = ({
  link,
  variant = "outlined",
  color = "primary",
  style = { minWidth: "250px", fontSize: "1.15rem" },
  children,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      target="blank"
      href={link}
      style={style}
    >
      {children}
    </Button>
  );
};

export default LinkButton;
