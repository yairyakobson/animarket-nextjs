import Home from "@/components/client/pages/Home";

import {
  fetchLatestProducts,
  fetchTopRatedProducts,
  fetchCategoryList
} from "@/components/server/dataAccess/filteredProducts";

import { oneWeekAgo } from "@/components/server/utils/date";

export default async function Homepage(){
  const minRating: number = 4.5;

  const [topRatedProducts, latestProducts, categories] = await Promise.all([
    fetchTopRatedProducts(minRating),
    fetchLatestProducts(oneWeekAgo()),
    fetchCategoryList()
  ]);

  return(
    <>
      <Home
      topRatedProducts={topRatedProducts}
      latestProducts={latestProducts}
      productCategories={categories}/>
    </>
  )
}