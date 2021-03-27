import { useContext } from "react";

//components
import Auth from "../../Auth/Auth";
import ProfilePage from "./ProfilePage";

//context
import { TokenContext } from "../../../helpers/context/token-context";

const Profile = () => {
  const { sessionToken } = useContext(TokenContext);
  return <div>{!sessionToken ? <Auth /> : <ProfilePage />}</div>;
};

export default Profile;
