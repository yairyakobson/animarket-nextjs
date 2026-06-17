"use client"

import { useParams } from "next/navigation";
import { useMemo, useState } from "react";
import { Image } from "react-bootstrap";

import { REVIEW_STRATEGIES, REVIEW_FILTERS } from "../../constants/product/productReviews.ts/productReviews";

import { ProductRating } from "../ProductRating";
import { ProductReviewsMapping } from "../../clientInterfaces/productInterfaces/productReviewsMapping";
import { ProductReviewProps } from "../../type/reviewsType";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetProductReviewsQuery } from "../../redux/services/reviewApi";

const Reviews: React.FC<ProductReviewsMapping> = ({ productReviews }) =>{
  const [sortBy, setSortBy] = useState<string>("Date");

  const params = useParams();

  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetProductReviewsQuery(params.id);

  const reviewsList = data?.product || [];

  const sortedReviews = useMemo(() =>{
    if(!productReviews) return [];
      
    const currentStrategy = REVIEW_STRATEGIES[sortBy];
    if (!currentStrategy) return [...reviewsList];
      
    return [...reviewsList].sort(currentStrategy);
  }, [productReviews, sortBy]);

  const dateFormat = (dateString: string | Date | undefined) =>{
    if (!dateString) return "Unknown Date";
    
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
  };

  return(
    <>
      <section className="mx-5 px-5
      md:mx-auto px-auto">
        <section className="flex flex-row justify-between items-center w-full mx-5 px-5">
          <h3>Reviews ({reviewsList?.length})</h3>
          <section className="dropdown dropdown-bottom dropdown-center">
            <section tabIndex={0} role="button" className="btn !bg-gray-100">Sort By: {sortBy}</section>
            <ul tabIndex={-1} className="dropdown-content menu z-1 w-52 p-2 shadow-sm">
              {REVIEW_FILTERS.map((filter, id) =>(
                <li key={id}>
                  <button 
                  type="button" 
                  onClick={() => setSortBy(filter)}
                  className={sortBy === filter ? "active" : ""}>
                    {filter}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </section>
        {sortedReviews?.map((review: ProductReviewProps) =>(
          <section key={review.id} className="py-2 px-[6rem] my-4">
            <section className="flex items-center gap-3 mb-3">
              <Image src={review.reviewerAvatar || review?.reviewerImage as string}
              alt={user?.name}
              className="rounded-circle"
              width="45"
              height="45"/>
              <p className="m-0 font-medium">
                {review?.reviewer} <span>({ dateFormat(review.createdAt) })</span>
              </p>
            </section>
            <section className="my-1">
              <ProductRating
              rating={review?.rating}
              className="1.5rem"
              isReadOnly={true}/>
            </section>
            <p className="px-[0.2rem]">{review?.comment}</p>
          </section>
        ))}
      </section>
    </>
  )
}

export default Reviews;