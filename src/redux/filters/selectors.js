import { createSelector } from "@reduxjs/toolkit"
import { selectContacts } from "../contacts/selectors"
import { selectNameFilter } from "./slice"

export const selectFilteredContacts = createSelector(
[ selectContacts, selectNameFilter],
 (contacts, contactFilter) => {
   return contacts.filter(contact => contact.name.toLowerCase()
    .includes(contactFilter.toLowerCase()) || contact.number.replace(/[^\d]/g, "").includes(contactFilter))
 }
) 