import { Box, Grid } from "@material-ui/core";
import AdminProtected from "../../AdminProtected";
import TestEmails from "./TestEmails";

const AdminPage = () => {
  return (
    <AdminProtected>
      <Grid container justifyContent="center">
        <Box display="flex" flexDirection="column" marginBottom={10}>
          <TestEmails />
        </Box>
      </Grid>
    </AdminProtected>
  );
};

export default AdminPage;
