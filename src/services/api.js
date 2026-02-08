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
  tagTypes: ['User', 'Profile', 'Organization', 'Insurance', 'Files', 'Shipper'],
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

    // Insurance Onboarding - Get insurance details
    getInsuranceDetails: builder.query({
      query: () => ({
        url: '/insurance/me',
        method: 'GET',
      }),
      providesTags: ['Insurance'],
    }),

    // Insurance Onboarding - Step 1: License & Classification
    submitInsuranceLicense: builder.mutation({
      query: ({ data, isUpdate }) => ({
        url: '/insurance/license',
        method: isUpdate ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['Insurance'],
    }),

    // Insurance Onboarding - Step 2: Coverage Geography
    submitInsuranceCoverage: builder.mutation({
      query: (coverageData) => ({
        url: '/insurance/coverage',
        method: 'PUT',
        body: coverageData,
      }),
      invalidatesTags: ['Insurance'],
    }),

    // Insurance Onboarding - Step 3: Policy Types
    submitInsurancePolicy: builder.mutation({
      query: (policyData) => ({
        url: '/insurance/policy',
        method: 'PUT',
        body: policyData,
      }),
      invalidatesTags: ['Insurance'],
    }),

    // Insurance Onboarding - Step 4: Claims & Integration
    submitInsuranceClaims: builder.mutation({
      query: (claimsData) => ({
        url: '/insurance/claims',
        method: 'PUT',
        body: claimsData,
      }),
      invalidatesTags: ['Insurance'],
    }),

    // File Upload - Single file
    uploadFile: builder.mutation({
      query: ({ file, folder }) => {
        const formData = new FormData();
        formData.append('file', file);
        return {
          url: `/files/upload?folder=${folder}`,
          method: 'POST',
          body: formData,
        };
      },
    }),

    // Get user's uploaded files
    getUserFiles: builder.query({
      query: () => ({
        url: '/files/me',
        method: 'GET',
      }),
      providesTags: ['Files'],
    }),

    // Delete file
    deleteFile: builder.mutation({
      query: (publicId) => ({
        url: `/files/${publicId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Files'],
    }),

    // Shipper Onboarding - Get shipper details
    getShipperDetails: builder.query({
      query: () => ({
        url: '/shipper/me',
        method: 'GET',
      }),
      providesTags: ['Shipper'],
    }),

    // Shipper Onboarding - Step 1: Business Classification
    submitShipperBusiness: builder.mutation({
      query: ({ data, isUpdate }) => ({
        url: '/shipper/business',
        method: isUpdate ? 'PUT' : 'POST',
        body: data,
      }),
      invalidatesTags: ['Shipper'],
    }),

    // Shipper Onboarding - Step 2: Cargo & Insurance
    submitShipperCargo: builder.mutation({
      query: (cargoData) => ({
        url: '/shipper/cargo',
        method: 'PUT',
        body: cargoData,
      }),
      invalidatesTags: ['Shipper'],
    }),

    // Shipper Onboarding - Step 3: Telematics Consent
    submitShipperConsents: builder.mutation({
      query: (consentsData) => ({
        url: '/shipper/consents',
        method: 'PUT',
        body: consentsData,
      }),
      invalidatesTags: ['Shipper'],
    }),

    // Shipper Onboarding - Step 4: Documents
    submitShipperDocuments: builder.mutation({
      query: (documentsData) => ({
        url: '/shipper/documents',
        method: 'PUT',
        body: documentsData,
      }),
      invalidatesTags: ['Shipper'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useVerifyEmailMutation,
  useCreateProfileMutation,
  useCreateOrganizationMutation,
  useGetInsuranceDetailsQuery,
  useSubmitInsuranceLicenseMutation,
  useSubmitInsuranceCoverageMutation,
  useSubmitInsurancePolicyMutation,
  useSubmitInsuranceClaimsMutation,
  useUploadFileMutation,
  useGetUserFilesQuery,
  useDeleteFileMutation,
  useGetShipperDetailsQuery,
  useSubmitShipperBusinessMutation,
  useSubmitShipperCargoMutation,
  useSubmitShipperConsentsMutation,
  useSubmitShipperDocumentsMutation,
} = api;
