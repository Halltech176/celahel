import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  loading: false,
  user: null,
  error: "",
};
const UserSlice = createSlice({
  name: "user_credential",
  initialState,
  reducers: {
      userCredential : (state, action) => {
        state.user = action.payload
      }
  },

});

export const { userCredential } = UserSlice.actions;
export default UserSlice.reducer;
