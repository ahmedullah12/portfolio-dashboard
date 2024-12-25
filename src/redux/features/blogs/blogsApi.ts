import { baseApi } from "@/redux/api/baseApi";

const blogsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getBlogs: builder.query({
      query: () => ({
        url: "/blogs",
        method: "GET",
      }),
      providesTags: ["Blogs"],
    }),
    addBlog: builder.mutation({
      query: (payload) => ({
        url: "/blogs",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Blogs"],
    }),
    editBlog: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/blogs/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Blogs"],
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blogs/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blogs"],
    }),
  }),
});

export const {
    useGetBlogsQuery,
    useAddBlogMutation,
    useDeleteBlogMutation,
    useEditBlogMutation
} = blogsApi;
