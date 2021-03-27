import { useContext } from "react";

//material component
import { Button, Grid, Typography } from "@material-ui/core";

//components
import Addresses from "./Addresses";

//context
import { TokenContext } from "../../../helpers/context/token-context";

//styles
import "./styles/ProfilePage.css";

const ProfilePage = () => {
  const {
    username,
    userEmail,
    isAdmin,
    clearToken,
    orders,
    addresses,
  } = useContext(TokenContext);

  return (
    <div className="profile-page">
      <Typography variant="h3">{username}</Typography>
      {isAdmin ? <Typography variant="body1">Administer</Typography> : null}
      <Button onClick={clearToken}>Logout</Button>
      <div className="profile-wrapper">
        <div className="profile-content">
          <Grid container spacing={3}>
            <Grid item sm={6}>
              <Typography variant="h4">Order History</Typography>
              {!orders ? (
                <Typography variant="caption">
                  You have not placed any orders yet
                </Typography>
              ) : null}
            </Grid>
            <Grid item sm={6}>
              <Typography variant="h4">Account Details</Typography>
              <Typography variant="caption">{userEmail}</Typography>
              <br />
              <Addresses addresses={addresses} />
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
