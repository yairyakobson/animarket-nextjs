"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";

import { useGetProductDetailsQuery } from "../redux/services/productApi";
import { useAppSelector } from "../hooks/useAppSelector";

import NewReview from "../layout/Review/NewReview";
import Reviews from "../layout/Review/Reviews";

import productDetailsStyles from "../styles/productDetails.module.scss";

export default function ProductDetails(){
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const productId = params?.id as string;

  const { data, error, isError } = useGetProductDetailsQuery(productId);

  const product = data?.product;
  console.log(product)

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
      <section className="hero my-5">
        <section className="flex flex-col lg:flex-row gap-x-8">
          <img
          src={product?.url}
          className="max-w-sm rounded-lg shadow-2xl mr-8"/>
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
            <span id="no-of-reviews" className="px-2">
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
            {isAuthenticated ? <NewReview productId={product?.id}/> : (
               <Alert className="alert-danger my-5">
                 {"Login to post your review."}
               </Alert>
             )}
          </section>
        </section>
      </section>
    </>
  )
}