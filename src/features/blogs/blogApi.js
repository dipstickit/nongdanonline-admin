import { apiSlice } from '../../apis/apiSlice';

export const blogApi = apiSlice.injectEndpoints({
  endpoints: build => ({
    getBlogList: build.query({
      query: params => ({
        url: '/admin/blog',
        method: 'GET',
        params,
      }),
      transformResponse: res => res,
      providesTags: ['Blog'],
    }),
    createBlog: build.mutation({
      query: data => ({
        url: '/admin/blog',
        method: 'POST',
        body: data,
      }),
      transformResponse: res => res,
      invalidatesTags: ['Blog'],
    }),
    getBlogDetail: build.query({
      query: id => ({
        url: `/blogs/${id}`,
        method: 'GET',
      }),
      transformResponse: res => res,
      providesTags: ['Blog'],
    }),
    updateBlog: build.mutation({
      query: ({ data, id }) => ({
        url: `/admin/blog/${id}`,
        method: 'PUT',
        body: data,
      }),
      transformResponse: res => res,
      invalidatesTags: ['Blog'],
    }),
    deleteBlog: build.mutation({
      query: id => ({
        url: `/admin/blog/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Blog'],
    }),
  }),
});

export const {
  useGetBlogListQuery,
  useCreateBlogMutation,
  useGetBlogDetailQuery,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
} = blogApi;
