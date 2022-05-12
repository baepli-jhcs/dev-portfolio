import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    let data = await fetch("https:///api.bena.works/projects");
    return data.json();
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    response: [],
    status: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProjects.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(fetchProjects.fulfilled, (state, { payload }) => {
      state.status = "success";
      state.response = payload;
    });
    builder.addCase(fetchProjects.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const projectsActions = projectsSlice.actions;
export default projectsSlice;
