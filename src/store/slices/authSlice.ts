import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginAdmin = createAsyncThunk(
  "login/admin",
  async (user: { email: string; password: string }) => {
    let data = await fetch(`${process.env.REACT_APP_API_URL}/login/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    return data.json();
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    response: { token: "" },
    status: "",
  },
  reducers: {
    clear: (state) => {
      state.response = { token: "" };
      state.status = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAdmin.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAdmin.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.response = payload;
    });
    builder.addCase(loginAdmin.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const authActions = authSlice.actions;
export default authSlice;
