import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../apis/apiSlice';

export const blocksApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getBlock: build.query({
      query: params => ({
        url: `/blocks?index=${params.index}&pageSize=${params.pageSize}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['Block'],
    }),
    getBlockByFarmId: build.query({
      query: id => ({
        url: `/blocks/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res.data,
      providesTags: ['BlockByFarm']
    }),
    addBlock: build.mutation({
      query: data => ({
        url: '/blocks',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Block', 'BlockByFarm'],
    }),
    deleteBlock: build.mutation({
      query: id => ({
        url: `/blocks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Block', 'BlockByFarm'],
    }),
    updateBlock: build.mutation({
      query: ({ id, data }) => ({
        url: `/blocks/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Block', 'BlockByFarm'],
    }),
  }),
});
export const {
  useGetBlockQuery,
  useDeleteBlockMutation,
  useAddBlockMutation,
  useUpdateBlockMutation,
  useGetBlockByFarmIdQuery,
} = blocksApi;
