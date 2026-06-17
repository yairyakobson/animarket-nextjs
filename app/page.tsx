import Home from "@/components/client/pages/Home";

import { fetchLatestProducts, fetchTopRatedProducts } from "@/components/server/dataAccess/filteredProducts";

import { oneWeekAgo } from "@/components/server/utils/date";

export default async function Homepage(){
  const minRating: number = 4.5;

  const [latestProducts, topRatedProducts] = await Promise.all([
    fetchLatestProducts(oneWeekAgo()),
    fetchTopRatedProducts(minRating)
  ]);

  return(
    <>
      <Home
      topRatedProducts={topRatedProducts}
      latestProducts={latestProducts}/>
    </>
  )
}