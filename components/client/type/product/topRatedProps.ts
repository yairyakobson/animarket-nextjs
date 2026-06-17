import { fetchTopRatedProducts } from "@/components/server/dataAccess/filteredProducts";

export type TopRatedProductsProps = Awaited<ReturnType<typeof fetchTopRatedProducts>>[number]