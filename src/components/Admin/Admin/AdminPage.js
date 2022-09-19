import { Box, Divider, Grid } from "@material-ui/core";
import AdminProtected from "../../AdminProtected";
import CancelOrder from "./CancelOrder";
import TestEmails from "./TestEmails";

const AdminPage = () => {
  return (
    <AdminProtected>
      <Grid container justifyContent="center">
        <Box display="flex" flexDirection="column" marginBottom={10}>
          <TestEmails />
          <Divider />
          <CancelOrder />
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default AdminPage;
