"use client"

import { Rating } from "next-flex-rating";

import { ProductRatingProps } from "../clientInterfaces/productInterfaces/productRatingProps";

export const ProductRating = ({
  rating,
  className,
  isReadOnly
}: ProductRatingProps) =>{
  return(
    <Rating
    count={5}
    value={rating ?? 0}
    color="#FFA41C"
    size={className}
    readOnly={isReadOnly}/>
  );
};