import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: "ua",
};

export const langSlice = createSlice({
  name: "currentLang",
  initialState,
  reducers: {
    setLang: (state, action) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLang } = langSlice.actions;

export default langSlice.reducer;
