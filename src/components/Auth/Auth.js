import { useState } from "react";

//material components
import Link from "@material-ui/core/Link";

//components
import Login from "./Login";
import Signup from "./Signup";

//styles
import "./styles/Auth.css";

const Auth = () => {
  const [alreadyUser, setAlreadyUser] = useState(true);

  const toggleAlreadyUser = (e) => {
    e.preventDefault();
    setAlreadyUser(!alreadyUser);
  };

  return (
    <div>
      {alreadyUser ? <Login /> : <Signup />}
      <Link onClick={toggleAlreadyUser}>
        {alreadyUser ? "Create An Account" : "Have an Account? Login"}
      </Link>
    </div>
  );
};

export default Auth;
