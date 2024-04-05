// import { useState } from "react";

// export default function ContactEditModal({ initialValue }) {
//   const [contact, setContacr] = useState(initialValue);
//   return (
//     <form>
//       <input type="text" value={contact.name} />
//       <input type="text" value={contact.number} />
//       <button type="submit">Save</button>
//     </form>
//   );
// }

import { useState } from "react";
import css from "./ContactEditModal.module.css";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import { nanoid } from "nanoid";
import toast from "react-hot-toast";

export default function ContactEditModal({ initialValue, onClose }) {
  const [contact, setContact] = useState(initialValue);

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setContact({ ...contact, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateContact(contact))
      .unwrap()
      .then(() => {
        onClose();
        toast.success("Contact saved");
      });
  };

  const contactNameId = nanoid();
  const contactNumberId = nanoid();

  return (
    <div className={css.modal}>
      <div className={css.modalContent}>
        <span className={css.close} onClick={onClose}>
          &times;
        </span>
        <form className={css.modalForm} onSubmit={handleSubmit}>
          <label className={css.modalLabel} htmlFor={contactNameId}>
            Name:
          </label>
          <input
            id={contactNameId}
            className={css.modalInput}
            type="text"
            name="name"
            value={contact.name}
            onChange={handleChange}
          />
          <label className={css.modalLabel} htmlFor={contactNumberId}>
            Number:
          </label>
          <input
            className={css.modalInput}
            type="text"
            name="number"
            value={contact.number}
            onChange={handleChange}
            id={contactNumberId}
          />
          <button type="submit" className={css.modalBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
