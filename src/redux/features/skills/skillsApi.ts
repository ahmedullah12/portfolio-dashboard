import { baseApi } from "@/redux/api/baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
      providesTags: ["Skills"],
    }),
    addSkill: builder.mutation({
      query: (payload) => ({
        url: "/skills",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Skills"],
    }),
    editSkill: builder.mutation({
      query: ({ id, payload }) => ({
        url: `/skills/${id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Skills"],
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `/skills/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Skills"],
    }),
  }),
});

export const {
  useGetSkillsQuery,
  useAddSkillMutation,
  useDeleteSkillMutation,
  useEditSkillMutation,
} = skillsApi;
