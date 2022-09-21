import { Box } from "@material-ui/core";
import ExtendedTabs from "../../Utils/ExtendedTabs";
import Metas from "./Metas";

const pages = [
  {
    value: "title",
    title: "Page Tile",
  },
  {
    value: "page",
    title: "Page Description",
  },
  {
    value: "image",
    title: "Page Image",
  },
  {
    value: "footer",
    title: "Footer Icon",
  },
];
const emails = [
  {
    value: "email_title",
    title: "Email Title",
  },
  {
    value: "email_message",
    title: "Email Message",
  },
  {
    value: "email_salutation",
    title: "Email Salutation",
  },
];

const shipping = [
  {
    value: "shipping_rate",
    title: "Shipping Rate",
  },
  {
    value: "shipping_min",
    title: "Shipping Minimum Days",
  },
  {
    value: "shipping_max",
    title: "Shipping Maximum Days",
  },
  {
    value: "shipping_carrier",
    title: "Shipping Carrier Code",
  },
  {
    value: "shipping_service",
    title: "Shipping Carrier Service",
  },
  {
    value: "shipping_min_weight",
    title: "Shipping Min Weight",
  },
  {
    value: "shipping_max_weight",
    title: "Shipping Max Weight",
  },
  {
    value: "free_shipping",
    title: "Total Cost Free Shipping",
  },
];

const Meta = () => {
  return (
    <Box display="flex" justifyContent="center">
      <ExtendedTabs
        tabs={[{ name: "Pages" }, { name: "Emails" }, { name: "Shipping" }]}
      >
        <Metas types={pages} />
        <Metas types={emails} />
        <Metas types={shipping} />
      </ExtendedTabs>
    </Box>
  );
};

export default Meta;
