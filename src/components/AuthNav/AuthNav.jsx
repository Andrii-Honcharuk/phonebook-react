import { NavLink } from "react-router-dom";
import css from "./AuthNav.module.css";

const makeActiveClass = ({ isActive }) => {
  return `css.link ${isActive && css.isActive}`;
};

export default function AuthNav() {
  return (
    <div className={css.link}>
      <NavLink to="/register" className={makeActiveClass}>
        Register
      </NavLink>
      <NavLink to="/login" className={makeActiveClass}>
        LogIn
      </NavLink>
    </div>
  );
}
