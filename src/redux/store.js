// src/redux/store.js
import { configureStore } from "@reduxjs/toolkit";
import bouquetsReducer from "./bouquetsSlice";

export const store = configureStore({
  reducer: {
    bouquets: bouquetsReducer,
  },
});
