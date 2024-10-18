import { apiSlice } from '../../apis/apiSlice';

export const authApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    login: build.mutation({
      query: data => ({
        url: '/auth/login',
        method: 'POST',
        body: data,
      }),
      invalidateTags: ['Auth'],
    }),
  }),
});

export const { useLoginMutation } = authApi;
