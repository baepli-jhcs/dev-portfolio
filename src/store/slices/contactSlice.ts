import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { Message } from "../../types/message";

export const submitMessage = createAsyncThunk(
  "contact/submitMessage",
  async (message: Message) => {
    let data = await fetch("https://api.bena.works/contact/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
    return data.json();
  }
);
const initialState = {
  response: {},
  status: "",
};

const contactSlice = createSlice({
  name: "contact",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(submitMessage.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(submitMessage.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.response = payload;
    });
    builder.addCase(submitMessage.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const contactActions = contactSlice.actions;
export default contactSlice;
