import { Button } from "@material-ui/core";

const PayPalDonate = ({
  variant = "outlined",
  color = "primary",
  style,
  children,
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      target="blank"
      href={"https://www.paypal.com/donate/?hosted_button_id=HKELG2HW6ZNL4"}
      style={style}
    >
      {children}
    </Button>
  );
};

export default PayPalDonate;
