import { createSlice } from "@reduxjs/toolkit";

const loadSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoading: (state) => {
      state.isLoading = true;
    },
    stopLoading: (state) => {
      state.isLoading = false;
    },
  },
});

export const loadActions = loadSlice.actions;
export default loadSlice;
