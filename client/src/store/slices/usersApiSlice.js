import { apiSlice } from './apiSlice';
const USERS_URL = '/users';

export const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: body
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    userProfile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/theme`,
        method: 'GET'
      }),
    }),
    updateTheme: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/theme`,
        method: 'PUT',
        body: data,
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useUserProfileMutation,
  useUpdateThemeMutation,
} = userApiSlice;