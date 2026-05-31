import { fetchProductReviews } from "@/components/server/dataAccess/reviews";
import { ProductDetailsProps } from "@/components/server/serverInterfaces/productInterface";

import Reviews from "@/components/client/layout/Review/Reviews";
import ProductDetails from "@/components/client/pages/ProductDetails";

export default async function ProductPage({ params }: ProductDetailsProps){
  const productId = params.productId
  const reviews = await fetchProductReviews(productId);

  return(
    <>
      <ProductDetails/>
      <Reviews productReviews={reviews}/>
    </>
  );
}