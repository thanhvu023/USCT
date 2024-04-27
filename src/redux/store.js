import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import programReducer from "./slice/programSlice";
import universityReducer from "./slice/universitySlice";
import authReducer from "./slice/authSlice";
import stateReducer from "./slice/stateSlice";
import majorReducer from "./slice/majorSlice";
import semesterReducer from "./slice/semesterSlice";
import studentReducer from "./slice/studentSice";
import registrationReducer from "./slice/registrationSlice";
import programApplicationReducer from "./slice/programApplicationSlice";
import consultantReducer from "./slice/consultantSlice";
import applyStageReducer from "./slice/applyStageSlice";
import programStageReducer from './slice/programStageSlice';
import  staffReducer from './slice/staffSlice'
const persistConfig = {
  key: "root",
  storage,
  version: 1,
  whitelist: ["auth"],
  blacklist: ["program", "university", "state", "major", "semester", "student"],
};

const rootReducer = combineReducers({
  program: programReducer,
  university: universityReducer,
  auth: authReducer,
  state: stateReducer,
  major: majorReducer,
  semester: semesterReducer,
  student: studentReducer,
  registration: registrationReducer,
  programApplication: programApplicationReducer,
  consultant: consultantReducer,
  applyStage: applyStageReducer,
  programStages : programStageReducer,
  staff : staffReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;

export const persistor = persistStore(store);
