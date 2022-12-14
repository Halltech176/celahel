import { createSlice } from "@reduxjs/toolkit";
import { Properties } from "../actions";

const initialState = {
  loading: false,
  properties: null,
  error: false,
};
const AllProperties = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: {
    [Properties.fulfilled]: (state, action) => {
      state.loading = false;
      state.properties = action.payload;
      state.error = false;
    },
    [Properties.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [Properties.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const PropertiesReducer = AllProperties.reducer;
