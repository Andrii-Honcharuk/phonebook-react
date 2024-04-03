import { createSelector } from "@reduxjs/toolkit"
import { selectContacts } from "../contacts/selectors"


export const selectNameFilter = (state) => state.filters.name;

export const selectFilteredContacts = createSelector(
[ selectContacts, selectNameFilter],
 (contacts, contactFilter) => {
   return contacts.filter(contact => contact.name.toLowerCase()
    .includes(contactFilter.toLowerCase()) || contact.number.replace(/[^\d]/g, "").includes(contactFilter))
 }
) 