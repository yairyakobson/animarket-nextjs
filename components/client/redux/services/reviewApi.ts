import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const reviewAPI = createApi({
  reducerPath: "reviewAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["Reviews"],
  endpoints: (builder) =>({
    submitReview: builder.mutation({
      query(body){
        return{
          url: "/reviews/new",
          method: "PUT",
          body
        }
      },
      invalidatesTags: ["Reviews"]
    }),
    getProductReviews: builder.query({
      query: (productId) => `/reviews/${productId}`,
      providesTags: ["Reviews"]
    })
  })
});

export const {
  useSubmitReviewMutation,
  useGetProductReviewsQuery
} = reviewAPI;