// contacts/slice.js

import { createSlice } from "@reduxjs/toolkit";
import { addContact, deleteContact, fetchContacts, updateContact } from "./operations";
import { logOut } from "../auth/operations";


const slice = createSlice({
  name: "contacts",
  initialState: {
    items: [],
    loading: false,
    error: null
  },
  
  extraReducers: builder => builder
    .addCase(fetchContacts.pending, (state) => {
      state.error = null
      state.loading = true;
    })
    .addCase(fetchContacts.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      state.items = action.payload;
    })
    .addCase(fetchContacts.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(deleteContact.pending, (state) => {
      state.error = null
      state.loading = true;
    })
    .addCase(deleteContact.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
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
      state.error = null;
      state.items.push(action.payload)
    })
    .addCase(addContact.rejected, (state) => {
      state.loading = false;
      state.error = true;
    })
    .addCase(logOut.fulfilled, (state) => {
      state.items = [];
      state.error = null;
      state.loading = false;
    })
    .addCase(updateContact.fulfilled, (state, action) => {
      const updatedContact = action.payload;
      state.items = state.items.map(item =>
        item.id === updatedContact.id ? updatedContact : item
      );
    })
  
})




export default slice.reducer;


