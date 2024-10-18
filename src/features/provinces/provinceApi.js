import { apiSlice } from '../../apis/apiSlice';

export const provinceApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getProvinceList: build.query({
      query: params => ({
        url: '/admin/provinces',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Province'],
    }),
    getProvinceDetail: build.query({
      query: id => ({
        url: `/admin/provinces/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['Province'],
    }),
    createProvince: build.mutation({
      query: data => ({
        url: '/admin/provinces',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Province'],
    }),
    updateProvince: build.mutation({
      query: data => ({
        url: `/admin/provinces/${data.id}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['Province'],
    }),
    deleteProvince: build.mutation({
      query: id => ({
        url: `/admin/provinces/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Province'],
    }),
  }),
});

export const {
  useGetProvinceListQuery,
  useGetProvinceDetailQuery,
  useCreateProvinceMutation,
  useUpdateProvinceMutation,
  useDeleteProvinceMutation,
} = provinceApi;
