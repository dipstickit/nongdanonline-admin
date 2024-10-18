import { apiSlice } from '../../apis/apiSlice';

export const transactionApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getTransactionList: build.query({
      query: params => ({
        url: '/admin/Transaction',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Transaction'],
    }),
    getFarmTransactionList: build.query({
      query: ({ farmId, params }) => ({
        url: `/admin/Transaction/${farmId}`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Transaction'],
    }),
    getTransactionHistoryList: build.query({
      query: params => ({
        url: `/admin/Transaction/transactions`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Transaction'],
    }),
    getTransactionShippingList: build.query({
      query: params => ({
        url: `/admin/Transaction/shipping-transactions`,
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Transaction'],
    }),
  }),
});

export const {
  useGetTransactionListQuery,
  useGetFarmTransactionListQuery,
  useGetTransactionHistoryListQuery,
  useGetTransactionShippingListQuery,
} = transactionApi;
