import { useContext } from "react";

//material component
import { Button, Grid, Typography } from "@material-ui/core";

//components
import { Orders } from "../../typescript-components/Orders.tsx";
// import Orders from "./Orders";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//styles
import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const { username, userEmail, isAdmin, clearToken } = useContext(TokenContext);

  return (
    <div className="profile-page">
      <Typography variant="h3">{username}</Typography>
      {isAdmin ? <Typography variant="body1">Administer</Typography> : null}
      <Button onClick={clearToken}>Logout</Button>
      <div className="profile-wrapper">
        <div className="profile-content">
          <Grid container spacing={0} justify="center">
            <Grid item lg={6}>
              <Typography variant="h4">Order History</Typography>
              <Orders />
            </Grid>
            <Grid item lg={6}>
              <Typography variant="h4">Account Details</Typography>
              <Typography variant="caption">{userEmail}</Typography>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
