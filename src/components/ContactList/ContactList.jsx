//ContactList.jsx

import { useSelector } from "react-redux";
import { selectFilteredContacts } from "../../redux/filters/selectors";

import Contact from "../Contact/Contact";

import style from "./ContactList.module.css";

export default function ContactList() {
  const visibleContacts = useSelector(selectFilteredContacts);

  return (
    <div>
      <ul className={style.list}>
        {visibleContacts.map((contact) => (
          <li key={contact.id}>
            <Contact data={contact} />
          </li>
        ))}
      </ul>
    </div>
  );
}
