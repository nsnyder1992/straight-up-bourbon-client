import { Box, Divider, Typography } from "@material-ui/core";
import AdminProtected from "../../AdminProtected";
import TestEmails from "./TestEmails";
import ExtendedTabs from "../../Utils/ExtendedTabs";
import Images from "../Meta/Images/Images";
import Metas from "../Meta/Metas";
import Rates from "../Meta/Rates/Rates";

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
    value: "page_link",
    title: "Page Link",
  },
  {
    value: "section",
    title: "Page Section",
  },
  {
    value: "disable",
    title: "Section Use Content",
  },
  {
    value: "footer",
    title: "Footer Icon",
  },
  {
    value: "nav_icon",
    title: "Navbar Icon",
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
  {
    value: "email_signage",
    title: "Email Signage",
  },
  {
    value: "email_template",
    title: "Email Template",
  },
];

const AdminPage = () => {
  return (
    <AdminProtected>
      <Box display="flex" justifyContent="center">
        <ExtendedTabs
          tabs={[
            { name: "Pages" },
            { name: "Emails" },
            { name: "Images" },
            { name: "Rates" },
          ]}
        >
          <Metas types={pages} />
          <>
            <Typography variant="h5">Test Emails</Typography>
            <TestEmails />
            <Divider style={{ margin: "15px 0px" }} />
            <Typography variant="h5">Email Meta Data</Typography>
            <Metas types={emails} />
          </>

          <Images />
          <Rates />
        </ExtendedTabs>
      </Box>
    </AdminProtected>
  );
};

export default AdminPage;
