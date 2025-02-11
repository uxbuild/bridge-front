import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../config"; // Import API URL

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (userData) => ({
        url: "/auth/register", // Backend endpoint
        method: "POST",
        headers: { "Content-Type": "application/json" }, // Ensure JSON format
        body: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email, // Email is the primary username
          password: userData.password,
        },
      }),
    }),
  }),
});

export const { useRegisterMutation } = authApi;
