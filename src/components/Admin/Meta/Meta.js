import { Box } from "@material-ui/core";
import ExtendedTabs from "../../Utils/ExtendedTabs";
import Metas from "./Metas";
import Rates from "./Rates/Rates";

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

const Meta = () => {
  return (
    <Box display="flex" justifyContent="center">
      <ExtendedTabs
        tabs={[{ name: "Pages" }, { name: "Emails" }, { name: "Rates" }]}
      >
        <Metas types={pages} />
        <Metas types={emails} />
        <Rates />
      </ExtendedTabs>
    </Box>
  );
};

export default Meta;
