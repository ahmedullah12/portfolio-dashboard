import { baseApi } from "@/redux/api/baseApi";
import { RootState } from "@/redux/store";

const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (payload) => ({
        url: "/auth/login",
        method: "POST",
        body: payload,
      }),
    }),
  }),
});

export const useCurrentUser = (state: RootState) => state.auth.user;
export const useCurrentToken = (state: RootState) => state.auth.token;

export const {
  useLoginUserMutation,
} = authApi;
