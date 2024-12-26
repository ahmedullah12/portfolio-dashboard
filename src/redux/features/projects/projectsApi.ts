import { baseApi } from "@/redux/api/baseApi";

const projectsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProjects: builder.query({
      query: () => ({
        url: "/projects",
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    getSingleProject: builder.query({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "GET",
      }),
      providesTags: ["Projects"],
    }),
    addProject: builder.mutation({
      query: (payload) => ({
        url: "/projects",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Projects"],
    }),
    editProject: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/projects/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Projects"],
    }),
    deleteProject: builder.mutation({
      query: (id) => ({
        url: `/projects/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Projects"],
    }),
  }),
});

export const {
  useGetProjectsQuery,
  useGetSingleProjectQuery,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = projectsApi;
