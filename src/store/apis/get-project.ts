import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Project from "../../types/project";

export const getProjectApi = createApi({
  reducerPath: "getProject",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/projects`,
  }),
  endpoints: (builder) => ({
    getProject: builder.query<Project[], undefined>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetProjectQuery } = getProjectApi;
