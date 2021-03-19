import { useContext } from "react";

//components
import Auth from "../../Auth/Auth";

//context
import { TokenContext } from "../../../helpers/context/token-context";

const Profile = () => {
  const { sessionToken } = useContext(TokenContext);
  return <div>{!sessionToken ? <Auth /> : <div>Profile</div>}</div>;
};

export default Profile;
