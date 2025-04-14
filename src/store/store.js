import { configureStore } from "@reduxjs/toolkit";
import TodoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    todo: TodoReducer,
  },
});
