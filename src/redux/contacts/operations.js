//contact/operations.js
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";



axios.defaults.baseURL = "https://connections-api.herokuapp.com"

//GET
export const fetchContacts = createAsyncThunk('contacts/fetchContacts', async (_, thunkAPI) => {
  try {
    const response = await axios.get('/contacts');
    return response.data;
   
  } catch (error) {
    return thunkAPI.rejectWithValue(error)
  }
})


//Delete
export const deleteContact = createAsyncThunk('contact/deleteContact', async (contactId, thunkAPI) => {
  try {
    const response = await axios.delete(`/contacts/${contactId}`);
    return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});


//ADD
export const addContact = createAsyncThunk('contact/addContact', async (newContact, thunkAPI) => {
  try {
    const response = await axios.post("/contacts", newContact);
    return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

//EDIT patch
export const updateContact = createAsyncThunk('contact/updateContact', async({id, name, number} , thunkAPI) => {
  try {
    const formatNumber = number.replace(/\D/g, "").replace(/(\d{1,3})(?=\d{3})/g,"$1-")
    const response = await axios.patch(`/contacts/${id}`,{name, number:formatNumber} );
    return response.data;
    
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});