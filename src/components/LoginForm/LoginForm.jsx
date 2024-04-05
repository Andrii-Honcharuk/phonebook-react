//LoginForm.jsx

import { Formik, Form, Field } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { logIn } from "../../redux/auth/operations";
import css from "./LoginForm.module.css";
import toast from "react-hot-toast";
import { selectAuthError } from "../../redux/auth/selectors";
import { Link } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const error = useSelector(selectAuthError);

  const handleSubmit = (values, actions) => {
    dispatch(logIn(values))
      .unwrap()
      .then(() => {
        actions.resetForm(); //
      })
      .catch(() => {
        toast.error("Ooops... Error, please reload page");
      });
  };

  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      onSubmit={handleSubmit}
    >
      <Form className={css.form} autoComplete="off">
        <label className={css.label}>
          Email
          <Field type="email" name="email" />
        </label>
        <label className={css.label}>
          Password
          <Field type="password" name="password" />
        </label>
        {error && (
          <p className={css.errorMessage}>
            Error. The user name or password is incorrect
          </p>
        )}
        <button type="submit" className={css.loginBtn}>
          Log In
        </button>
        <div className={css.registerCont}>
          <p>or</p>
          <Link to="/register" className={css.textRegister}>
            register
          </Link>
        </div>
      </Form>
    </Formik>
  );
}
