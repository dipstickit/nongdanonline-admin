import { apiSlice } from '../../apis/apiSlice';

export const userApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getUserDetail: build.query({
      query: userId => ({
        url: `/users/${userId}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['User'],
    }),
    updateUserInfo: build.mutation({
      query: ({ data }) => ({
        url: `/users/${data.id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['User'],
    }),
    changeAvatar: build.mutation({
      query: ({ data }) => ({
        url: `/users/${data.id}/change-avatar`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['User'],
    }),
    changePassword: build.mutation({
      query: ({ data }) => ({
        url: `/users/${data.id}/change-password`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['User'],
    }),
    getAllUsers: build.query({
      query: ({ pageIndex, pageSize, searchTerm }) => ({
        url: `/users?pageIndex=${pageIndex}&pageSize=${pageSize}&searchTerm=${searchTerm || ''}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['User'],
    }),
    getBlockOwnerByUser: build.query({
      query: ({
        userId,
        pageIndex,
        pageSize,
        blockCode,
        startDate,
        endDate,
        isAvailable,
        status,
      }) => ({
        url: '/block-owner-users/get-block-owner-by-user',
        method: 'GET',
        params: {
          userId,
          pageIndex,
          pageSize,
          blockCode,
          startDate,
          endDate,
          isAvailable,
          status,
        },
      }),
      transformResponse: res => res,
      providesTags: ['User'],
    }),
  }),
});

export const {
  useGetUserDetailQuery,
  useUpdateUserInfoMutation,
  useChangeAvatarMutation,
  useChangePasswordMutation,
  useGetAllUsersQuery,
  useGetBlockOwnerByUserQuery,
} = userApi;
