import { apiSlice } from '../../apis/apiSlice';

export const animalApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    // ================== Animal ==================
    getAnimalList: build.query({
      query: params => ({
        url: '/animals/farms-animals',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Animal'],
    }),
    createAnimal: build.mutation({
      query: data => ({
        url: '/animals',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['Animal'],
    }),
    // ================== Animal Owner ==================
    createAnimalOwner: build.mutation({
      query: data => ({
        url: '/animal-owner-users',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['AnimalOwner'],
    }),
    // ================== Animal Stage ==================
    getAnimalStageList: build.query({
      query: animalId => ({
        url: `/animal-stages/${animalId}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['AnimalStage'],
    }),
    // ================== Animal Type ==================
    getAnimalTypeList: build.query({
      query: params => ({
        url: '/animal-types',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['AnimalType'],
    }),
    createAnimalType: build.mutation({
      query: data => ({
        url: '/animal-types',
        method: 'POST',
        data,
      }),
      invalidatesTags: ['AnimalType'],
    }),
    updateAnimalType: build.mutation({
      query: data => ({
        url: `/animal-types/${data.animalTypeID}`,
        method: 'PUT',
        data,
      }),
      invalidatesTags: ['AnimalType'],
    }),
    deleteAnimalType: build.mutation({
      query: animalTypeID => ({
        url: `/animal-types/${animalTypeID}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['AnimalType'],
    }),
  }),
});

export const {
  useGetAnimalListQuery,
  useCreateAnimalMutation,
  useCreateAnimalOwnerMutation,
  useGetAnimalStageListQuery,
  useGetAnimalTypeListQuery,
  useCreateAnimalTypeMutation,
  useUpdateAnimalTypeMutation,
  useDeleteAnimalTypeMutation,
} = animalApi;
