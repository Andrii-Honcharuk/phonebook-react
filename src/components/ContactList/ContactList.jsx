//ContactList.jsx

import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";

import Contact from "../Contact/Contact";

import css from "./ContactList.module.css";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);
  const haveNotContacts = "Don't have any contacts"
// console.log("visibleContacts",visibleContacts);
  return (
    <>
    <div className={css.container}>
        {(visibleContacts.length === 0) && <p>{haveNotContacts}</p>}
      <ul className={css.list}>
        {visibleContacts.map((contact) => (
          <li className={css.listItem} key={contact._id}> 
            <Contact data={contact} />
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
