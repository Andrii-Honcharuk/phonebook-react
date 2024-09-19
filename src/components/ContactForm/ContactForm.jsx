//ContactForm.jsx

import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import css from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contacts/operations";
import toast from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!").trim()
    .max(50, "Too Long!")
    .required("Required"),
  phone: Yup.string()
    .matches(/^[\d()-]+$/, "Invalid phone number format")
    .min(3, "Too Short!").trim()
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    const formattedPhone = values.phone.trim().replace(/(\d{1,3})(?=\d{3})/g, "$1-");
    dispatch(addContact({ name: values.name.trim(), phone: formattedPhone }))
      .unwrap()
      .then(() => {
        toast.success("Contact saved");
      })
      .catch(() => {
        toast.error("Error, please reload page");
      });
    actions.resetForm();
  };

  const contactNameId = nanoid();
  const contactPhoneId = nanoid();

  return (
    <div className={css.addContactContainer}>
      <Formik
        initialValues={{
          name: "",
          phone: "",
        }}
        validationSchema={ContactSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <label htmlFor={contactNameId}>Name</label>
          <Field type="text" name="name" id={contactNameId}></Field>
          <p className={css.warning}>
            <ErrorMessage name="name" />
          </p>
          <label htmlFor={contactPhoneId}>Phone</label>
          <Field
            type="tel"
            name="phone"
            id={contactPhoneId}

            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          />
          <p className={css.warning}>
            <ErrorMessage name="phone" />
          </p>
          <button type="submit" className={css.btn}>
            Add contact
          </button>
        </Form>
      </Formik>
    </div>
  );
}
