import { createSlice } from "@reduxjs/toolkit";
import { signup } from "./actions";

const initialState = {
  loading: false,
  user: null,
  error: "",
};
const UserSlice = createSlice({
  name: "signup",
  initialState,
  reducers: {},
  extraReducers: {
    [signup.fulfilled]: (state, action) => {
      state.loading = false;
      state.user = action.payload;
    },
    [signup.pending]: (state) => {
      state.loading = true;
    },
    [signup.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});

export const UserReducer = UserSlice.reducer;
