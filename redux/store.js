import { configureStore } from "@reduxjs/toolkit";
import currentLangReducer from "./slice/lang";

export const store = configureStore({
  reducer: {
    currentLang: currentLangReducer,
  },
});
