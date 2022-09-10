import { createSlice } from "@reduxjs/toolkit";
import { CreateProperty } from "../actions";

const initialState = {
  loading: false,
  newProperty: null,
  error: false,
};
const NewProperty = createSlice({
  name: "newproperty",
  initialState,
  reducers: {},
  extraReducers: {
    [CreateProperty.fulfilled]: (state, action) => {
      state.loading = false;
      state.newProperty = action.payload;
      state.error = false;
    },
    [CreateProperty.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [CreateProperty.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const CreatePropertyReducer = NewProperty.reducer;
