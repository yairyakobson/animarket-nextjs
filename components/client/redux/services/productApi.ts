import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productAPI = createApi({
  reducerPath: "productAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api/v1"
  }),
  tagTypes: ["Product", "Reviews"],
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
    getProducts: builder.mutation({
      query: () =>({
        url: "/products",
        method: "GET"
      })
    }),
    getUserProducts: builder.query({
      query: () =>({
        url: "user/my_products"
      })
    }),
    getFilteredProducts: builder.query({
      query: () =>({
        url: "/products/filter"
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
  useGetProductsMutation,
  useGetUserProductsQuery,
  useGetFilteredProductsQuery,
  useGetProductDetailsQuery
} = productAPI;