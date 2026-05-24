import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["Product"],
  endpoints: (builder) =>({
    createProduct: builder.mutation({
      query(body){
        return{
          url: "/product/new",
          method: "POST",
          body
        }
      },
      invalidatesTags: ["Product"]
    }),
    getUserProducts: builder.query({
      query: (params) =>({
        url: "user/my_products",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "rating[gte]": params?.rating,
          "price[gte]": params.min,
          "price[lte]": params.max
        }
      })
    }),
    getFilteredProducts: builder.query({
      query: (params) =>({
        url: "/products/filter",
        params: {
          page: params?.page,
          keyword: params?.keyword,
          category: params?.category,
          "rating[gte]": params?.rating,
          "price[gte]": params.min,
          "price[lte]": params.max
        }
      })
    }),
    getProductDetails: builder.query({
      query: (id) => `/product/${id}`,
      providesTags: ["Product"]
    })
  })
});

export const {
  useCreateProductMutation,
  useGetUserProductsQuery,
  useGetFilteredProductsQuery,
  useGetProductDetailsQuery,
} = productAPI;