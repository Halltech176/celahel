import { createSlice } from "@reduxjs/toolkit";
import { PropertyStat } from "../actions";

const initialState = {
  loading: false,
  stats: null,
};
const StatsSlice = createSlice({
  name: "stats",
  initialState,
  reducers: {},
  extraReducers: {
    [PropertyStat.fulfilled]: (state, action) => {
      state.loading = false;
      state.stats = action.payload;
    },
    [PropertyStat.pending]: (state) => {
      state.loading = true;
    },
    [PropertyStat.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});
export const statsReducer = StatsSlice.reducer;
