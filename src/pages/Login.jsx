//pages/Login.jsx;

import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm/LoginForm";
import PageTitle from "../components/PageTitle/PageTitle";

// import { useSelector } from "react-redux";

// import { selectAuthError } from "../redux/auth/selectors";

export default function Login() {
  // const error = useSelector(selectAuthError);

  return (
    <div>
      <PageTitle>Please log in</PageTitle>
      <LoginForm />
      {/* {error && <p>Error Login or password</p>} */}

      <p>
        or <Link to="/register">register</Link>
      </p>
    </div>
  );
}
