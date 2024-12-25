import { baseApi } from "@/redux/api/baseApi";

const skillsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSkills: builder.query({
      query: () => ({
        url: "/skills",
        method: "GET",
      }),
    }),
    addSkill: builder.mutation({
      query: (payload) => ({
        url: "/skills",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const { useGetSkillsQuery, useAddSkillMutation } = skillsApi;
