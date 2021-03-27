import { useState } from "react";

//material components
import Link from "@material-ui/core/Link";

//components
import Login from "./Login";
import Signup from "./Signup";
import ForgotPassword from "./ForgotPassword";

//styles
import "./styles/Auth.css";

const Auth = () => {
  const [alreadyUser, setAlreadyUser] = useState(true);
  const [forgotPassword, setForgotPassword] = useState(false);

  const toggleAlreadyUser = (e) => {
    e.preventDefault();
    setAlreadyUser(!alreadyUser);
  };

  const toggleForgotPassword = (e) => {
    e.preventDefault();
    setForgotPassword(!forgotPassword);
  };

  return (
    <div>
      {forgotPassword ? (
        <ForgotPassword toggleForgotPassword={toggleForgotPassword} />
      ) : null}

      {alreadyUser && !forgotPassword ? <Login /> : null}

      {!alreadyUser && !forgotPassword ? <Signup /> : null}

      <Link onClick={toggleAlreadyUser}>
        {alreadyUser && !forgotPassword ? "Create An Account" : null}
        {!alreadyUser && !forgotPassword ? "Have an Account? Login" : null}
      </Link>
      {!forgotPassword ? <br /> : null}
      <Link onClick={toggleForgotPassword}>
        {alreadyUser && !forgotPassword ? "Forgot Password?" : null}
        {forgotPassword ? "Go back" : null}
      </Link>
    </div>
  );
};

export default Auth;
