import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

import programReducer from "./slice/programSlice";
import universityReducer from "./slice/universitySlice";
import authReducer from "./slice/authSlice";
import stateReducer from "./slice/stateSlice";
import majorReducer from "./slice/majorSlice";
import semesterReducer from "./slice/semesterSlice";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = combineReducers({
  program: programReducer,
  university: universityReducer,
  auth: authReducer,
  state: stateReducer,
  major: majorReducer,
  semester: semesterReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
});

export default store;

export const persistor = persistStore(store);
