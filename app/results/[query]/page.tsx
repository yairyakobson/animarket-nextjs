import { fetchSearchedProducts } from "@/components/server/dataAccess/filteredProducts";
import { ProductSearchProps } from "@/components/client/clientInterfaces/productInterfaces/searchProps";

import SearchedProducts from "@/components/client/layout/Products/Results";

export default async function SearchedProductsDisplay({ params }: ProductSearchProps) {
  const resolvedParams = await params;
  const cleanQuery = decodeURIComponent(resolvedParams.query.replace(/\+/g, " "));
  const searchedProducts = await fetchSearchedProducts(cleanQuery);

  if(!searchedProducts || searchedProducts.length === 0){
    return(
      <section className="text-center p-5 mt-5">
        <h2>No products found</h2>
      </section>
    );
  }

  return(
    <>
      <h1 className="mb-4 text-center mt-3">Found {searchedProducts?.length} products</h1>
      <SearchedProducts searchedProducts={searchedProducts}/>
    </>
 );
}