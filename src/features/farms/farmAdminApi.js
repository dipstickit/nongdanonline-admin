import { apiSlice } from '../../apis/apiSlice';

export const farmAdminApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getFarmAnimalStage: build.query({
      query: ({ id, params }) => ({
        url: `/admin/farm/${id}/animal-stage`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['FarmAdmin'],
    }),
    getFarmRevenue: build.query({
      query: ({ farmId, params }) => ({
        url: `/admin/farm/${farmId}/revenue`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['FarmAdmin'],
    }),
    getFarmCustomer: build.query({
      query: params => ({
        url: `/admin/farm/customers`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['FarmAdmin'],
    }),
  }),
});

export const {
  useGetFarmAnimalStageQuery,
  useGetFarmRevenueQuery,
  useGetFarmCustomerQuery,
} = farmAdminApi;
