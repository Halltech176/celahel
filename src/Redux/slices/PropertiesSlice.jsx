import { createSlice } from "@reduxjs/toolkit";
import { Properties } from "../actions";

const initialState = {
  loading: false,
  properties: null,
  error: "",
};
const AllProperties = createSlice({
  name: "properties",
  initialState,
  reducers: {},
  extraReducers: {
    [Properties.fulfilled]: (state, action) => {
      state.loading = false;
      state.properties = action.payload;
    },
    [Properties.pending]: (state) => {
      state.loading = true;
    },
    [Properties.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});

export const PropertyReducer = AllProperties.reducer;
