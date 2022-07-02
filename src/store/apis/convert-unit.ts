import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import ConvertedUnit from "../../types/converted-unit";

export const convertUnitApi = createApi({
  reducerPath: "convertUnit",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/unit-converter`,
  }),
  endpoints: (builder) => ({
    convertUnit: builder.query<ConvertedUnit, string>({
      query: (str) => ({
        url: `/?input=${str}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useLazyConvertUnitQuery } = convertUnitApi;
