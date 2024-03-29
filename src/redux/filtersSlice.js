// filtersSlice.js

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const slice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    filterContactsByName(state, action) { 
      state.name = action.payload;
    }
  }
})

export default slice.reducer;

export const { filterContactsByName } = slice.actions;

export const selectNameFilter = (state) => state.filters.name;

