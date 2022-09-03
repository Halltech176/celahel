import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { UserReducer } from "./slices/UserSlice";
import { loginReducer } from "./slices/loginSlice";
import { AllUserReducer } from "./slices/AllUserSlice";
import { PropertyReducer } from "./slices/PropertiesSlice";
import VerifyUser from "./slices/VerifyUserSlice";
import candidateReducer from "./slices/userStates";
import { AllNotificationReducer } from "./slices/NotificationSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  userDetails: UserReducer,
  login: loginReducer,
  allusers: AllUserReducer,
  properties: PropertyReducer,
  user: VerifyUser,
  candidate: candidateReducer,
  notification: AllNotificationReducer,
});
const persistedReducers = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: persistedReducers,
});
export default Store;
