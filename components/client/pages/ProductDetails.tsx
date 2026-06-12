"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, Container, Form } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";

import { useAppSelector } from "../hooks/useAppSelector";
import { useGetProductDetailsQuery } from "../redux/services/productApi";
import { useGetProductReviewsQuery } from "../redux/services/reviewApi";

import Reviews from "../layout/Review/Reviews";
import NewReview from "../layout/Review/NewReview";

import productDetailsStyles from "../styles/productDetails.module.scss";

export default function ProductDetails(){
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const productId = params?.id as string;

  const { data, error, isError, isLoading } = useGetProductDetailsQuery(productId);
  const { data: reviewsData } = useGetProductReviewsQuery(productId);
  const product = data?.product;

  const { isAuthenticated, user } = useAppSelector((state) => state.user);

  useEffect(() =>{
    if(isError){
      toast.error(error as string);
    }
  }, [error]);

  const increaseQty = () =>{
    const count: any = document.querySelector(".count");
    if(count?.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () =>{
    const count: any = document.querySelector(".count");
    if(count?.valueAsNumber <= 1) return;

    const qty = count?.valueAsNumber - 1;
    setQuantity(qty);
  }

  return(
    <>
      {isLoading ? (
        <section className="flex justify-center items-center !h-[85dvh]">
          <span className="loading loading-spinner loading-xl !w-[10rem]"/>
        </section>
      ) : (
        <Container as="section" fluid>
        <section className="hero my-5">
          <section className="flex flex-col gap-y-8 lg:flex-row gap-x-16">
            <img
            src={product?.url}
            className="max-w-sm rounded-lg"/>
            <section>
              <h1 className="text-5xl font-bold">{product?.name}</h1>
              <Rating
              iconsCount={5}
              initialValue={product?.averageRating}
              allowFraction={true}
              fillColor="#FFA41C"
              size={25}
              readonly
              SVGclassName="inline-block"/>
              <span id="no-of-reviews" className="px-2 relative top-[0.075rem]">
                ({product?.totalReviews} Reviews)
              </span>
              <p className={`${productDetailsStyles.productPrice} text-2xl font-bold mt-3`}>
                {"$" + product?.price}
              </p>

              <section className={`flex flex-row items-stretch
                ${productDetailsStyles.stockCounter}`}>
                <Button variant="danger"
                className="!items-center"
                onClick={decreaseQty}
                disabled={product?.stock === 0 || !user || product?.seller === user?.name}>-</Button>

                <Form.Control type="number"
                className={`${productDetailsStyles.stockCounter}`}
                value={quantity}
                onChange={(e: any) =>setQuantity(e.target.value)}
                readOnly/>

                <Button variant="danger"
                className="!items-center"
                onClick={increaseQty}
                disabled={product?.stock === 0 || !user || product?.seller === user?.name}>+</Button>
              </section>
              <p className="mt-3">
                Condition: {" "}
                <span className={productDetailsStyles.conditionStatus}>
                  {product?.condition}
                </span>
              </p>
              <p>
                Stock: {" "}
                <span id="stock_status"
                className={product?.stock > 0
                ? `${productDetailsStyles.stockStatus} text-green-600`
                : `${productDetailsStyles.stockStatus} text-red-600`}>
                  {product?.stock > 0 ? `In Stock ${product?.stock === 1 ? "(Only 1 left)" : ""}` : "Out of Stock"}
                </span>
              </p>
              <p className="py-2">
                Description: {" "}
                {product?.description}
              </p>
              <p>
                Sold by: {" "}
                <strong>{product?.seller}</strong>
              </p>
              {isAuthenticated ? <NewReview/> : (
                <Alert className="alert-danger my-5">
                  {"Login to post your review."}
                </Alert>
              )}
            </section>
          </section>
        </section>
        {reviewsData && (
          <Reviews productReviews={reviewsData}/>
        )}
        </Container>
      )}
    </>
  )
}