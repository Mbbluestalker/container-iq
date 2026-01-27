import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const BASE_URL = 'https://api-containeriq.onrender.com/api';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth?.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['User', 'Profile', 'Organization'],
  endpoints: (builder) => ({
    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Step 1: Initial Signup
    signup: builder.mutation({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
    }),

    // Step 2: Email OTP Verification
    verifyEmail: builder.mutation({
      query: (verificationData) => ({
        url: '/auth/verify/email',
        method: 'POST',
        body: verificationData,
      }),
    }),

    // Step 3: Primary Contact Person
    createProfile: builder.mutation({
      query: (profileData) => ({
        url: '/profile',
        method: 'POST',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Step 4: Organization Identity
    createOrganization: builder.mutation({
      query: (organizationData) => ({
        url: '/organization',
        method: 'POST',
        body: organizationData,
      }),
      invalidatesTags: ['Organization'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useCreateProfileMutation,
  useCreateOrganizationMutation,
} = api;
