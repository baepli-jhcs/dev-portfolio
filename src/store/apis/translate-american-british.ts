import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const translateAmericanBritishApi = createApi({
  reducerPath: "translateAmericanBritish",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/translate`,
  }),
  endpoints: (builder) => ({
    translateAmericanBritish: builder.query<
      { text: string; translation: string },
      { text: string; locale: string }
    >({
      query: (str) => ({
        url: "/",
        method: "POST",
        body: str,
      }),
    }),
  }),
});

export const { useLazyTranslateAmericanBritishQuery } =
  translateAmericanBritishApi;
