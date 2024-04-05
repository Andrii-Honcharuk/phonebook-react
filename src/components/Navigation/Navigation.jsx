//Navigation.jsx

import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";

const makeActiveClass = ({ isActive }) => {
  return `css.link ${isActive && css.isActive}`;
};

export default function Navigation() {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.link}>
      <NavLink to="/" className={makeActiveClass}>
        Home
      </NavLink>
      {isLoggedIn && (
        <NavLink className={makeActiveClass} to="/contacts">
          Contacts
        </NavLink>
      )}
    </nav>
  );
}
