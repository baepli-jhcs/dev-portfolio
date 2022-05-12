import { createSlice } from "@reduxjs/toolkit";

const initialLoadSlice = createSlice({
  name: "loading",
  initialState: {
    isLoading: true,
  },
  reducers: {
    stopLoading: (state: { isLoading: boolean }) => {
      state.isLoading = false;
    },
  },
});

export const initialLoadActions = initialLoadSlice.actions;
export default initialLoadSlice;
