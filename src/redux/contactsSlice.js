// contactsSlice.js

import { createSlice, createSelector } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts } from "./contactsOps";
import { selectNameFilter } from "./filtersSlice";

const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  extraReducers: builder => builder
    .addCase(fetchContacts.pending, (state) => {
      state.error = false
      state.loading = true;
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.items = action.payload;
    })
    .addCase(fetchContacts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(deleteContact.pending, (state) => {
      state.error = false
      state.loading = true;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.items = state.items.filter(item => item.id !== action.payload.id)
    })
    .addCase(deleteContact.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(addContact.pending, (state) => {
      state.error = false
      state.loading = true;
    })
    .addCase(addContact.fulfilled, (state, action) => {
      state.loading = false;
      state.error = false;
      state.items.push(action.payload)
    })
    .addCase(addContact.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
})




export default slice.reducer;


export const selectContacts = (state) => state.contacts.items;
export const selectContactsLoading = (state) => state.contacts.loading;
export const selectContactsError = (state) => state.contacts.error;

 
export const selectFilteredContacts = createSelector(
[ selectContacts, selectNameFilter],
 (contacts, contactFilter) => {
   return contacts.filter(contact => contact.name.toLowerCase()
    .includes(contactFilter.toLowerCase()))
 }
) 