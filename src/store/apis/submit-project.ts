import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Project from "../../types/project";

export const submitProjectApi = createApi({
  reducerPath: "submitProject",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.bena.works/projects",
  }),

  endpoints: (builder) => ({
    submitProject: builder.query<any, { project: Project; token: string }>({
      query: (input) => {
        let project: any = input.project;
        project.token = input.token;
        return {
          url: "/",
          method: "POST",
          body: { project },
        };
      },
    }),
  }),
});

export const { useSubmitProjectQuery } = submitProjectApi;
