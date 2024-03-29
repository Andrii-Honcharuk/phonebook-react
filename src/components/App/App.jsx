// App.jsx


import ContactForm from "../ContactForm/ContactForm";
import { useEffect } from "react";
import ContactList from "../ContactList/ContactList";
import SearchBox from "../SearchBox/SearchBox";

import style from "./App.module.css";
import { useDispatch, useSelector } from "react-redux";
import { fetchContacts } from "../../redux/contactsOps";
import toast, { Toaster } from "react-hot-toast";
import {
  selectContactsError,
  selectContactsLoading,
} from "../../redux/contactsSlice";

export default function App() {
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
    <div className={style.container}>
      <h1>Phone book</h1>
      <ContactForm />
      <SearchBox />
      {error && <p>Error loading</p>}
      {loading && <p>Loading...</p>}
      <ContactList />
      <Toaster />
    </div>
  );
}
