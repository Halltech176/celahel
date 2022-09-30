import { createSlice } from "@reduxjs/toolkit";
import { GetTransactions } from "../actions";

const initialState = {
  loading: false,
  transactions: null,
};
const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {},
  extraReducers: {
    [GetTransactions.fulfilled]: (state, action) => {
      state.loading = false;
      state.transactions = action.payload;
    },
    [GetTransactions.pending]: (state) => {
      state.loading = true;
    },
    [GetTransactions.rejected]: (state) => {
      state.loading = false;
      state.error = true;
    },
  },
});
export const TransactionsReducer = transactionsSlice.reducer;
