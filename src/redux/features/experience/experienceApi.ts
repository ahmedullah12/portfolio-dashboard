import { baseApi } from "@/redux/api/baseApi";

const experienceApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getExperiences: builder.query({
      query: () => ({
        url: "/experiences",
        method: "GET",
      }),
      providesTags: ["Experiences"],
    }),
    getSingleExperience: builder.query({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "GET",
      }),
      providesTags: ["Experiences"],
    }),
    addExperience: builder.mutation({
      query: (payload) => ({
        url: "/experiences",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Experiences"],
    }),
    editExperience: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/experiences/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Experiences"],
    }),
    deleteExperience: builder.mutation({
      query: (id) => ({
        url: `/experiences/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Experiences"],
    }),
  }),
});

export const {
    useAddExperienceMutation,
    useDeleteExperienceMutation,
    useEditExperienceMutation,
    useGetExperiencesQuery,
    useGetSingleExperienceQuery
} = experienceApi;
