//Contact.jsx;

import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import css from "./Contact.module.css";
import { HiMiniPhone, HiMiniUser } from "react-icons/hi2";
import toast from "react-hot-toast";
import { useState } from "react";
import ContactEditModal from "../ContactEditModal/ContactEditModal";

export default function Contact({ data }) {
  console.log({ data });
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const handleDelete = (value) =>
    dispatch(deleteContact(value))
      .unwrap()
      .then(() => {
        console.log("Contact Deleted");
        toast.success("Contact Deleted");
      })
      .catch(() => {
        toast.success("Error, please reload page");
      });

  return (
    <>
      {isEditing && (
        <div className={css.backdrop}>
          <ContactEditModal
            initialValue={data}
            onClose={() => setIsEditing(false)}
          />
        </div>
      )}
      <div className={css.container}>
        <div className={css.containerNameNumber}>
          <p className={css.text}>
            <HiMiniUser />
            {data.name}
          </p>
          <p className={css.text}>
            {" "}
            <HiMiniPhone /> {data.number}
          </p>
        </div>

        <div className={css.btnContainer}>
          <button className={css.btn} onClick={() => setIsEditing(true)}>
            Edit
          </button>
          <button className={css.btn} onClick={() => handleDelete(data.id)}>
            Delete
          </button>
        </div>
      </div>
    </>
  );
}
