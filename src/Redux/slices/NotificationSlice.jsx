import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../actions";

const initialState = {
  loading: false,
  notifications: null,
  error: "",
};
const AllNotification = createSlice({
  name: "notifications",
  initialState,
  reducers: {},
  extraReducers: {
    [Notification.fulfilled]: (state, action) => {
      state.loading = false;
      state.notifications = action.payload;
    },
    [Notification.pending]: (state) => {
      state.loading = true;
    },
    [Notification.rejected]: (state) => {
      state.loading = false;
      state.error = "unable to fetch data";
    },
  },
});

export const AllNotificationReducer = AllNotification.reducer;
