import { fetchCategoryList } from "@/components/server/dataAccess/filteredProducts";

export type CategoriesProps = Awaited<ReturnType<typeof fetchCategoryList>>[number]