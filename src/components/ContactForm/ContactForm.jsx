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
    const formattedNumber = values.number.replace(/(\d{1,3})(?=\d{3})/g, "$1-");
    // console.log(formattedNumber);
    dispatch(addContact({ name: values.name, number: formattedNumber }))
      .unwrap()
      .then(() => {
        console.log("Contact saved");
        toast.success("Contact saved");
      })
      .catch(() => {
        toast.error("Error, please reload page");
      });
    actions.resetForm();
  };

  const contactNameId = nanoid();
  const contactNumberId = nanoid();

  return (
    <div className={css.addContactContainer}>
      <Formik
        initialValues={{
          name: "",
          number: "",
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
          <label htmlFor={contactNumberId}>Number</label>
          <Field
            type="tel"
            name="number"
            id={contactNumberId}

            // pattern="[0-9]{3}-[0-9]{2}-[0-9]{2}"
          />
          <p className={css.warning}>
            <ErrorMessage name="number" />
          </p>
          <button type="submit">Add contact</button>
        </Form>
      </Formik>
    </div>
  );
}
