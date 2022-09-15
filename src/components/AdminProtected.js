import { Typography } from "@material-ui/core";
import { useContext } from "react";
import { TokenContext } from "../helpers/context/token-context";

const AdminProtected = ({ children }) => {
  //context
  const { isAdmin } = useContext(TokenContext);

  return (
    <>{isAdmin ? <>{children}</> : <Typography>Not Authorized</Typography>}</>
  );
};

export default AdminProtected;
