import CategorizedProducts from "@/components/client/pages/CategorizedProducts";
import { fetchCategorizedProducts } from "@/components/server/dataAccess/filteredProducts";

export default async function CategorizedProductsPage(
  { params }: { params: Promise<{ name: string }> }
){
  const category = (await params)?.name;
  const categoryProddcts = await fetchCategorizedProducts(category);
  
  return(
    <>
      <CategorizedProducts categoryProducts={categoryProddcts}/>
    </>
  );
}