//SearchBox.jsx
import { useDispatch, useSelector } from "react-redux";

import css from "./SearchBox.module.css";
import { filterContactsByName } from "../../redux/filters/slice";
import { selectNameFilter } from "../../redux/filters/selectors";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filterValue = useSelector(selectNameFilter);

  function handleChange(e) {
    dispatch(filterContactsByName(e.target.value));
  }

  return (
    <div className={css.findContainer}>
      <p className={css.label}>Find contacts by name or number</p>
      <input
        className={css.input}
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
