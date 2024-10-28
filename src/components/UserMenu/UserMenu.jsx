import { useDispatch, useSelector } from "react-redux";
import css from "./UserMenu.module.css";
import { selectIsLoading, selectUser } from "../../redux/auth/selectors";
import { logOut } from "../../redux/auth/operations";
import Loader from "../Loader/Loader";

export default function UserMenu() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectIsLoading);

  return (
    <div className={css.wrapper}>
      <p className={css.username}>Welcome, {user.name}</p>
      <button
        type="button"
        onClick={() => dispatch(logOut())}
        disabled={isLoading}
      >
        Logout
      </button>
      {isLoading && <Loader />}
    </div>
  );
}
