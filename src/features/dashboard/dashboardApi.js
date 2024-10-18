import { apiSlice } from '../../apis/apiSlice';

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTopUsers: build.query({
      query: params => ({
        url: '/admin/dash-board/top-users',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Dashboard'],
    }),
    getFarmTopUsers: build.query({
      query: ({ farmId, params }) => ({
        url: `/admin/dash-board/${farmId}/top-users`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Dashboard'],
    }),
    getTopFarmRevenue: build.query({
      query: params => ({
        url: '/admin/dash-board/top-farm-revenue',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Dashboard'],
    }),
    getRevenue: build.query({
      query: params => ({
        url: '/admin/dash-board/revenue',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Dashboard'],
    }),
    getFarmRevenue: build.query({
      query: ({ farmId, params }) => ({
        url: `/admin/dash-board/${farmId}/revenue`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Dashboard'],
    }),
  }),
});

export const {
  useGetTopUsersQuery,
  useGetFarmTopUsersQuery,
  useGetTopFarmRevenueQuery,
  useGetRevenueQuery,
  useGetFarmRevenueQuery,
} = dashboardApi;
