import { createSlice } from "@reduxjs/toolkit";
import { Overview } from "../actions";

const initialState = {
  loading: false,
  overview: null,
  error: false,
};
const AllOverview = createSlice({
  name: "Overview",
  initialState,
  reducers: {},
  extraReducers: {
    [Overview.fulfilled]: (state, action) => {
      state.loading = false;
      state.overview = action.payload;
      state.error = false;
    },
    [Overview.pending]: (state) => {
      state.loading = true;
      state.error = false;
    },
    [Overview.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});

export const OverviewReducer = AllOverview.reducer;
