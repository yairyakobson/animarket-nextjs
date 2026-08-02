import { filterProducts } from "@/components/server/dataAccess/products";
import { zodFilterProductSchema } from "@/components/server/schemas/zod/zod-product/ZodProductFilter";

import { ProductSearchProps } from "@/components/client/clientInterfaces/productInterfaces/searchProps";

import SearchedProducts from "@/components/client/pages/SearchedProducts";

export default async function SearchedProductsDisplay({ params, searchParams }: ProductSearchProps){
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  const cleanQuery = decodeURIComponent(resolvedParams.query);

  const rawFilters = {
    search: cleanQuery,
    category: resolvedSearchParams?.category,
    minPrice: resolvedSearchParams?.minPrice,
    maxPrice: resolvedSearchParams?.maxPrice,
    rating: resolvedSearchParams?.rating,
    sortBy: resolvedSearchParams?.sortBy,
    sortOrder: resolvedSearchParams?.sortOrder
  };
  const parsedFilters = zodFilterProductSchema.safeParse(rawFilters);

  if(!parsedFilters.success){
    return(
      <section className="text-center p-5 mt-5 text-error">
        <h2>Invalid filter parameters provided.</h2>
      </section>
    );
  }
  
  const searchedProducts = await filterProducts(parsedFilters.data);

  if(!searchedProducts || searchedProducts.length === 0){
    return(
      <section className="text-center p-5 mt-5">
        <h2>No products found</h2>
      </section>
    );
  }

  return(
    <>
      <SearchedProducts searchedProducts={searchedProducts}/>
    </>
 );
}