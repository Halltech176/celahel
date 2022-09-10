import { createSlice } from "@reduxjs/toolkit";
import { EditProperty } from "../actions";

const initialState = {
  loading: false,
  editedproperty: null,
  error: false,
};
const Property = createSlice({
  name: "editedproperty",
  initialState,
  reducers: {},
  extraReducers: {
    [EditProperty.fulfilled]: (state, action) => {
      state.loading = false;
      state.editedproperty = action.payload;
      state.error = false;
    },
    [EditProperty.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [EditProperty.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const EditPropertyReducer = Property.reducer;
