import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import Project from "../../types/project";

export const getProjectApi = createApi({
  reducerPath: "getProject",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bena.works/projects",
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
