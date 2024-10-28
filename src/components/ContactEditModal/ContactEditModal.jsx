import { Formik, Form, Field, ErrorMessage } from "formik";
import css from "./ContactEditModal.module.css";
import { useDispatch } from "react-redux";
import { updateContact } from "../../redux/contacts/operations";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useEffect } from "react";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .trim()
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^\+?(\d+[-()]?)*\d+$/, "Invalid phone number format")
    .min(3, "Too Short!")
    .trim()
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactEditModal({ initialValue, onClose }) {
  const dispatch = useDispatch();

  const handleClose = () => {
    onClose();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      handleClose();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className={css.modal} onClick={handleOverlayClick}>
      {" "}
      <div className={css.modalContent}>
        <span className={css.close} onClick={handleClose}>
          &times;
        </span>
        <Formik
          initialValues={{
            _id: initialValue._id,
            name: initialValue.name,
            phone: initialValue.phone,
          }}
          validationSchema={ContactSchema}
          onSubmit={(values, { resetForm }) => {
            dispatch(updateContact(values))
              .unwrap()
              .then(() => {
                handleClose();
                toast.success("Contact saved");
              })
              .catch(() => {
                toast.error("Failed to save contact");
              });
          }}
        >
          <Form className={css.modalForm}>
            <label className={css.modalLabel} htmlFor="name">
              Name:
            </label>
            <Field
              id="name"
              className={css.modalInput}
              type="text"
              name="name"
            />
            <p className={css.warning}>
              <ErrorMessage name="name" />
            </p>
            <label className={css.modalLabel} htmlFor="phone">
              Phone:
            </label>
            <Field
              id="phone"
              className={css.modalInput}
              type="text"
              name="phone"
            />
            <p className={css.warning}>
              <ErrorMessage name="phone" />
            </p>
            <button type="submit" className={css.modalBtn}>
              Save
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}
