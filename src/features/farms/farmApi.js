import { createSelector } from '@reduxjs/toolkit';
import { apiSlice } from '../../apis/apiSlice';

export const farmApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getFarmList: build.query({
      query: () => ({
        url: '/farms',
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['Farm'],
    }),
    getFarmDetail: build.query({
      query: id => ({
        url: `/farms/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['Farm'],
    }),
    getFarmFullDetail: build.query({
      query: id => ({
        url: `/farms/${id}/details`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['FarmDetail'],
    }),
    createFarm: build.mutation({
      query: ({ payload, images }) => {
        const formData = new FormData();
        images?.forEach(img => {
          formData.append('ImageFiles', img.originFileObj);
        });
        return {
          url: '/farms',
          method: 'POST',
          params: payload,
          body: formData,
        };
      },
      invalidatesTags: ['Farm'],
    }),
    updateFarm: build.mutation({
      query: ({ payload, image }) => {
        const formData = new FormData();
        console.log(image);
        image?.forEach(img => {
          formData.append('ImageFiles', img.originFileObj);
        });
        return {
          url: `/farms/${payload.id}`,
          method: 'PATCH',
          params: payload,
          body: formData,
          formData: true,
        };
      },
      invalidatesTags: ['Farm'],
    }),
    deleteFarm: build.mutation({
      query: id => ({
        url: `/farms/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Farm'],
    }),
  }),
});


export const {
  useGetFarmListQuery,
  useGetFarmDetailQuery,
  useGetFarmFullDetailQuery,
  useCreateFarmMutation,
  useUpdateFarmMutation,
  useDeleteFarmMutation,
} = farmApi;
