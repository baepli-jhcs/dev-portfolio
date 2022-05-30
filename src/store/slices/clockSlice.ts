import { createSlice } from "@reduxjs/toolkit";
import { commonReducers } from "./commonReducers";
const defaultState = ["25:00", "25:00"];
const tempReducers = commonReducers("Clock", defaultState);

const clockSlice = createSlice({
  name: "clock",
  initialState: defaultState,
  reducers: tempReducers,
});

export const clockActions = clockSlice.actions;
export default clockSlice;
