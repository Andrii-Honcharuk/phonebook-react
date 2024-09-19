import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, contactFilter) => {
    const visibleContacts = contacts.filter((contact) => {
      // console.log("contact", contact.contact.name);
      return (
        contact.name.includes(contactFilter.toLowerCase()) ||
        contact.phone.replace(/[^\d]/g, "").includes(contactFilter)
      );
    });

    console.log("visibleContacts", visibleContacts);
    return visibleContacts;
  }
);
