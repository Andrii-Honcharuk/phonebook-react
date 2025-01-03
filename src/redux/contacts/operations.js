import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://backendphonebook-u8kj.onrender.com/api";
// axios.defaults.baseURL = "http://localhost:3000/api";

//GET ALL
export const fetchAllDbContacts = createAsyncThunk(
  "contacts/fetchAllDbContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("contacts/admin");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//GET
export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get("/contacts");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

//Delete
export const deleteContact = createAsyncThunk(
  "contact/deleteContact",
  async (contactId, thunkAPI) => {
    try {
      const response = await axios.delete(`/contacts/${contactId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//ADD
export const addContact = createAsyncThunk(
  "contact/addContact",
  async (newContact, thunkAPI) => {
    try {
      const response = await axios.post("/contacts", newContact);

      return response.data.contact;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

//EDIT patch
export const updateContact = createAsyncThunk(
  "contact/updateContact",
  async ({ _id, name, phone }, thunkAPI) => {
    try {
      const formatPhone = phone
        .replace(/\D/g, "")
        .replace(/(\d{1,3})(?=\d{3})/g, "$1-");
      const response = await axios.put(`/contacts/${_id}`, {
        name,
        phone: formatPhone,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
