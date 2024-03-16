import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./slice/programSlice";
import universityReducer from "./slice/universitySlice";
import authReducer from "./slice/authSlice";

const store = configureStore({
  reducer: {
    program: programReducer,
    university: universityReducer,
    auth: authReducer
  },
});
export default store;
