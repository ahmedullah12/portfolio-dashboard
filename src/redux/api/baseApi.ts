import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://portfolio-backend-fawn-ten.vercel.app/api",
    credentials: "include",
  }),
  tagTypes: ["Skills", "Blogs", "Projects"],
  endpoints: () => ({}),
});
