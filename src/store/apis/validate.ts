import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const validateApi = createApi({
  reducerPath: "validate",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.bena.works/validate" }),
  endpoints: (builder) => ({
    validate: builder.query<any, string>({
      query: (token) => {
        return {
          url: "/",
          method: "POST",
          body: { token },
        };
      },
    }),
  }),
});

export const { useValidateQuery } = validateApi;
