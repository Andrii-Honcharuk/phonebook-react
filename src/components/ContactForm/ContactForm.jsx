//ContactForm.jsx

import { Formik, Form, Field, ErrorMessage } from "formik";
import { nanoid } from "nanoid";
import * as Yup from "yup";

import style from "./ContactForm.module.css";
import { useDispatch } from "react-redux";
import { addContact } from "../../redux/contactsOps";
import toast from "react-hot-toast";

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  number: Yup.string()
    .matches(/^[\d()-]+$/, "Invalid phone number format")
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});

export default function ContactForm() {
  const dispatch = useDispatch();
  const handleSubmit = (values, actions) => {
    dispatch(addContact({ name: values.name, number: values.number }))
      .unwrap()
      .then(() => {
        toast.success("Contact saved");
      })
      .catch(() => {
        toast.success("Error, please reload page");
      });
    actions.resetForm();
  };

  const contactNameId = nanoid();
  const contactNumberId = nanoid();

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      validationSchema={ContactSchema}
      onSubmit={handleSubmit}
    >
      <Form className={style.form}>
        <label htmlFor={contactNameId}>Name</label>
        <Field type="text" name="name" id={contactNameId}></Field>
        <p className={style.warning}>
          <ErrorMessage name="name" />
        </p>
        <label htmlFor={contactNumberId}>Number</label>
        <Field
          type="tel"
          name="number"
          id={contactNumberId}
          // pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
        />
        <p className={style.warning}>
          <ErrorMessage name="number" />
        </p>
        <button type="submit">Add contact</button>
      </Form>
    </Formik>
  );
}
