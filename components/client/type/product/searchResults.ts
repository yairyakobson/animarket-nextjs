import { fetchSearchedProducts } from "@/components/server/dataAccess/filteredProducts";

export type SearchedProductsProps = Awaited<ReturnType<typeof fetchSearchedProducts>>[number]