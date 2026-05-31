"use client"

import { useParams } from "next/navigation";
import { Image } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import { ProductReviewsMapping } from "../../clientInterfaces/productReviewsMapping";
import { ProductReviewProps } from "../../type/reviewsType";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetProductReviewsQuery } from "../../redux/services/reviewApi";

const Reviews: React.FC<ProductReviewsMapping> = () =>{
  const params = useParams();

  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetProductReviewsQuery(params.id);

  const reviewsList = data?.product || [];

  return(
    <>
      <section className="mx-5 px-5">
        <h3 className="mx-5 px-5">Reviews:</h3>
        {reviewsList && reviewsList?.map((review: ProductReviewProps) =>(
          <section key={review.productId} className="py-3 px-[6rem] my-4">
            <Image src={user?.avatar || user?.url as string}
            alt={user?.name}
            className="rounded-circle"
            width="45"
            height="45"/>
            <p className="px-1 py-2 my-0">by {review?.reviewer}</p>
            <Rating
            iconsCount={5}
            initialValue={review?.rating as number}
            fillColor="#FFA41C"
            size={22}
            readonly
            SVGclassName="inline-block"/>
            <p className="px-1 mt-2">{review?.comment}</p>
          </section>
        ))}
      </section>
    </>
  )
}
export default Reviews;