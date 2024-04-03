//auth/operations.js

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";


// axios.defaults.baseURL = "https://65fd7ab09fc4425c65320c6c.mockapi.io/"

axios.defaults.baseURL = "https://connections-api.herokuapp.com"

const setAuthHeader = (token) => {
  axios.defaults.headers.common[('Authorization')] = `Bearer ${token}`
}

const clearAuthHeader = () => {
  axios.defaults.headers.common[('Authorization')] = ""
}

//Post REGISTER
export const register = createAsyncThunk('auth/register', async (userInfo, thunkAPI) => {
  console.log(userInfo);
  console.log(thunkAPI);
  try {
    const response = await axios.post('/users/signup', userInfo);
    setAuthHeader(response.data.token);
    return response.data;
   
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})


//GET Login
export const logIn = createAsyncThunk('auth/login', async (userInfo, thunkAPI) => {
  console.log(userInfo);
  try {
    const response = await axios.post('/users/login', userInfo);

    setAuthHeader(response.data.token);
    return response.data;
   
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})


//GET LogOut
export const logOut = createAsyncThunk('auth/logout', async (_, thunkAPI) => {
  console.log("Logout ");
  try {
    const response = await axios.post('/users/logout');

    clearAuthHeader();
    return response.data;
   
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
})


//GET Refreshing
export const refreshUser = createAsyncThunk('auth/refresh', async (_, thunkAPI) => {
  //Reading token from the state
  const reduxState = thunkAPI.getState();
  const savedToken = reduxState.auth.token;
  setAuthHeader(savedToken);
  const response = await axios.get('/users/current')
  return response.data;
},
{
  condition: (_, {getState}) => {
    const reduxState = getState();
    const savedToken = reduxState.auth.token;
    return savedToken !== null;
  }
}
);