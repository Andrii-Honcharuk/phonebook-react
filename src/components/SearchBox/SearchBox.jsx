//SearchBox.jsx
import { useDispatch, useSelector } from "react-redux";

import style from "./SearchBox.module.css";
import {
  filterContactsByName,
  selectNameFilter,
} from "../../redux/filtersSlice";

export default function SearchBox() {
  const dispatch = useDispatch();

  const filterValue = useSelector(selectNameFilter);

  function handleChange(e) {
    dispatch(filterContactsByName(e.target.value));
  }

  return (
    <div>
      <p className={style.label}>Find contacts by name or number</p>
      <input
        type="text"
        name="filter"
        placeholder="Search by name"
        value={filterValue}
        onChange={handleChange}
      />
    </div>
  );
}
