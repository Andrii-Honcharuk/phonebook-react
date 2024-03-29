import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://65fd7ab09fc4425c65320c6c.mockapi.io/"

export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
   
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})

export const deleteContact = createAsyncThunk('contact/deleteContact', async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

export const addContact = createAsyncThunk('contact/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", newContact);
    return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});