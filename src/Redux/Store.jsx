import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { SignUpReducer } from "./slices/UserSlice";
import { loginReducer } from "./slices/loginSlice";
import { UserReducer } from "./slices/UserProfile";
import { PropertiesReducer } from "./slices/PropertiesSlice";
import { PropertyReducer } from "./slices/PropertySlice";
import { OverviewReducer } from "./slices/OverviewSlice";
import { EditPropertyReducer } from "./slices/EditPropertySlice";
import { CreatePropertyReducer } from "./slices/CreatePropertySlice";
import { BanksReducer } from "./slices/BanksSlice";
import VerifyUser from "./slices/VerifyUserSlice";
import candidateReducer from "./slices/userStates";
import { AllNotificationReducer } from "./slices/NotificationSlice";
import { SettingsReducer } from "./slices/SettingsSlice";
import { TransactionsReducer } from "./slices/TransactionsSlice";
import { statsReducer } from "./slices/StatsSlice";

const persistConfig = {
  key: "root",
  storage,
};
const reducers = combineReducers({
  userDetails: SignUpReducer,
  login: loginReducer,
  userprofile: UserReducer,
  properties: PropertiesReducer,
  property: PropertyReducer,
  user: VerifyUser,
  candidate: candidateReducer,
  notification: AllNotificationReducer,
  editproperty: EditPropertyReducer,
  newproperty: CreatePropertyReducer,
  overview: OverviewReducer,
  banks: BanksReducer,
  settings: SettingsReducer,
  stats: statsReducer,
  transactions: TransactionsReducer,
});
// const persistedReducers = persistReducer(persistConfig, reducers);
const Store = configureStore({
  reducer: reducers,
  devTools: true,
});
export default Store;
