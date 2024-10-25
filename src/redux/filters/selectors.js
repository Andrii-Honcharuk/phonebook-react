import { createSelector } from "@reduxjs/toolkit";
import { selectContacts } from "../contacts/selectors";

export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectNameFilter],
  (contacts, contactFilter) => {
    const visibleContacts = contacts.filter((contact) => {
      return (
        contact.name.toLowerCase().includes(contactFilter.toLowerCase()) ||
        contact.phone.replace(/[^\d]/g, "").includes(contactFilter)
      );
    });

    return visibleContacts;
  }
);
