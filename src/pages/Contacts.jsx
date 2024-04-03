// pages/Contacts.jsx

import toast, { Toaster } from "react-hot-toast";
import ContactForm from "../components/ContactForm/ContactForm";
import ContactList from "../components/ContactList/ContactList";
import PageTitle from "../components/PageTitle/PageTitle";
import SearchBox from "../components/SearchBox/SearchBox";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContactsError,
  selectContactsLoading,
} from "../redux/contacts/selectors";
import { useEffect } from "react";
import { fetchContacts } from "../redux/contacts/operations";

// import style from "./App.module.css";

export default function Contacts() {
  const dispatch = useDispatch();
  const loading = useSelector(selectContactsLoading);
  const error = useSelector(selectContactsError);

  useEffect(() => {
    dispatch(fetchContacts())
      // для обробки UI завантаження
      .unwrap()
      .catch(() => {
        toast.success("Ooops... Error, please reload page");
      });
    //---------------
  }, [dispatch]);

  return (
    <>
      <PageTitle>Your contacts</PageTitle>;
      <ContactForm />
      <SearchBox />
      {error && <p>Error loading</p>}
      {loading && <p>Loading...</p>}
      <ContactList />
      <Toaster />
    </>
  );
}
