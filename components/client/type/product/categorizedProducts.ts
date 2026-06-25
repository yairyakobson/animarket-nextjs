import { fetchCategorizedProducts } from "@/components/server/dataAccess/filteredProducts";

export type CategorizedProductProps = Awaited<ReturnType<typeof fetchCategorizedProducts>>[number]