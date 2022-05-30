import { createSlice } from "@reduxjs/toolkit";

export const calculatorSlice = createSlice({
  name: "math",
  initialState: "0",
  reducers: {
    addValue: (state, action) =>
      parseFloat(
        (parseFloat(state) + parseFloat(action.payload)).toPrecision(12)
      ).toString(),
    multiplyValue: (state, action) =>
      parseFloat(
        (parseFloat(state) * parseFloat(action.payload)).toPrecision(12)
      ).toString(),
    divideValue: (state, action) =>
      parseFloat(
        (parseFloat(state) / parseFloat(action.payload)).toPrecision(12)
      ).toString(),
    clearValue: (state) => "0",
    setValue: (state, action) => action.payload.toString(),
  },
});
export const calculatorActions = calculatorSlice.actions;
