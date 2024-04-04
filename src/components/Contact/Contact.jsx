//Contact.jsx;

import { useDispatch } from "react-redux";
import { deleteContact } from "../../redux/contacts/operations";
import style from "./Contact.module.css";
import { HiMiniPhone, HiMiniUser } from "react-icons/hi2";
import toast from "react-hot-toast";

export default function Contact({ data: { id, name, number } }) {
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
    <div className={style.container}>
      <div className={style.containerNameNumber}>
        <p className={style.text}>
          <HiMiniUser />
          {name}
        </p>
        <p className={style.text}>
          {" "}
          <HiMiniPhone /> {number}
        </p>
      </div>
      <button className={style.btn} onClick={() => handleDelete(id)}>
        Delete
      </button>
    </div>
  );
}
