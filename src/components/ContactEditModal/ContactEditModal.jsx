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

    setContact({ ...contact, [name]: value.trim() });
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
  const contactPhoneId = nanoid();

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
            value={contact.name.trim()}
            onChange={handleChange}
          />
          <label className={css.modalLabel} htmlFor={contactPhoneId}>
            Phone:
          </label>
          <input
            className={css.modalInput}
            type="text"
            name="phone"
            value={contact.phone.trim()}
            onChange={handleChange}
            id={contactPhoneId}
          />
          <button type="submit" className={css.modalBtn}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
