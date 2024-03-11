import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./slice/programSlice";

const store = configureStore({
  reducer: { program: programReducer },
});
export default store;
