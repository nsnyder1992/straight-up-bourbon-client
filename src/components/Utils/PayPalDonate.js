import { Button } from "@material-ui/core";
import { useEffect, useState } from "react";
import APIURL from "../../helpers/environment";

const PayPalDonate = ({
  variant = "outlined",
  color = "primary",
  style,
  children,
}) => {
  const [title, setTitle] = useState("Tip Jar");
  const [link, setLink] = useState(
    "https://www.paypal.com/donate/?hosted_button_id=HKELG2HW6ZNL4"
  );

  const getMetas = () => {
    fetch(`${APIURL}/meta/by/path/`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
      }),
      body: JSON.stringify({
        path: "PayPal-Button",
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        for (let meta of json) {
          switch (meta.type) {
            case "title":
              setTitle(meta.message);
              break;
            case "page_link":
              setLink(meta.message);
              break;
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    getMetas();
  }, [children]);

  return (
    <Button
      variant={variant}
      color={color}
      target="blank"
      href={link}
      style={style}
    >
      {title}
    </Button>
  );
};

export default PayPalDonate;
