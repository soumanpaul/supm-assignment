import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery(
  { 
    baseUrl: 'http://localhost:8080/api', 
    credentials:"include",
  });

export const apiSlice = createApi({
  baseQuery: baseQuery,
  tagTypes: ['User'],
  endpoints: (builder) => ({})
});
