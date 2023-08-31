import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
console.log("ENV...",process.env.REACT_APP_API_URL)
const baseQuery = fetchBaseQuery(
  { 
    baseUrl: process.env.REACT_APP_API_URL, 
    credentials:"include",
  });

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({})
});
