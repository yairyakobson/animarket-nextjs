import { fetchLatestProducts } from "@/components/server/dataAccess/filteredProducts";

export type LatestProductsProps = Awaited<ReturnType<typeof fetchLatestProducts>>[number]