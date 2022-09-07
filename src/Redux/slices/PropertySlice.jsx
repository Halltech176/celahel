import { createSlice } from "@reduxjs/toolkit";
import { Property } from "../actions";

const initialState = {
  loading: false,
  property: null,
  error: "",
};
const AllProperty = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: {
    [Property.fulfilled]: (state, action) => {
      state.loading = false;
      state.Property = action.payload;
    },
    [Property.pending]: (state) => {
      state.loading = true;
    },
    [Property.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});

export const PropertyReducer = AllProperty.reducer;
