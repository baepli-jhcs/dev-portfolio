import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const sudokuApi = createApi({
  reducerPath: "solveSudoku",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/sudoku`,
  }),
  endpoints: (builder) => ({
    solveSudoku: builder.query<{ solution: string }, string>({
      query: (str) => ({
        url: `/solve`,
        method: "POST",
        body: {
          puzzle: str,
        },
      }),
    }),
    checkSudokuCoordinate: builder.query<{ valid: boolean }, string>({
      query: (str) => ({
        url: `/validate`,
        method: "POST",
        body: {
          puzzle: str,
        },
      }),
    }),
  }),
});

export const { useLazySolveSudokuQuery, useLazyCheckSudokuCoordinateQuery } =
  sudokuApi;
