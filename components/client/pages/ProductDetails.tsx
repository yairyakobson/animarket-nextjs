"use client"

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";

import { useGetProductDetailsQuery } from "../redux/services/productApi";

import productDetailsStyles from "../styles/productDetails.module.scss";

export default function ProductDetails(){
  const [quantity, setQuantity] = useState(1);

  const params = useParams();
  const { data, error, isError, isLoading } = useGetProductDetailsQuery(
    params?.id
  );
  const product = data?.product;
  console.log(product)

  useEffect(() =>{
    if(isError){
      toast.error(error as string);
    }
  }, [error]);

  const increaseQty = () =>{
    const count: any = document.querySelector(".count");
    if(count.valueAsNumber >= product?.stock) return;

    const qty = count.valueAsNumber + 1;
    setQuantity(qty);
  }

  const decreaseQty = () =>{
    const count: any = document.querySelector(".count");
    if(count.valueAsNumber <= 1) return;

    const qty = count.valueAsNumber - 1;
    setQuantity(qty);
  }

  return(
    <>
      <Container as="section" className="mt-5">
        <Row as="section" className="d-flex justify-content-around">
          <Col as="section" lg={6} className={productDetailsStyles.productImage}>
            <section className={`rounded-xl overflow-hidden
              ${isLoading ? "skeleton h-full w-full" : ""}`
            }/>
            <section className="p-3">
              {!isLoading && (
                <img className="!block w-100"
                src={product?.url ||"https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
                alt={product?.name}
                height="400px"/>
              )}
            </section>
          </Col>

           <Col as="section" className={productDetailsStyles.productDetails}>
            <h3 className={`${isLoading ? "skeleton h-8 w-3/4" : ""}`}>{product?.name}</h3>

            <section className={`flex flex-row items-center ${isLoading ? "skeleton h-8 w-3/4" : ""}`}>
              {!isLoading && (
                <>
                  <Rating
                  className="mt-1"
                  iconsCount={5}
                  initialValue={product?.averageRating}
                  allowFraction={true}
                  fillColor="#FFA41C"
                  size={25}
                  readonly
                  SVGclassName="inline-block"/>
                  <span id="no-of-reviews" className="pt-1 px-2">
                    ({product?.totalReviews} Reviews)
                  </span>
                </>
              )}
            </section>
            <hr/>

            <p className={`${productDetailsStyles.productPrice} ${isLoading ? "skeleton h-7 w-1/4" : ""}`}>
              {!isLoading && "$" + product?.price}
            </p>

            <section className={`!flex !flex-row !items-stretch
              ${productDetailsStyles.stockCounter} ${isLoading ? "skeleton h-12 w-2/3" : ""}`}>
              {!isLoading && (
                <>
                  <Button variant="danger"
                  className="!items-center"
                  onClick={decreaseQty}>-</Button>

                  <Form.Control type="number"
                  className={`${productDetailsStyles.stockCounter}`}
                  value={quantity}
                  onChange={(e: any) =>setQuantity(e.target.value)}
                  readOnly/>

                  <Button variant="danger"
                  className="!items-center"
                  onClick={increaseQty}>+</Button>
                </>
              )}
            </section>

            <hr/>

            <p className={`${isLoading ? "skeleton h-5 w-1/3" : ""}`}>
              {!isLoading && (
                <>
                  Condition: {" "}
                  <span className={productDetailsStyles.conditionStatus}>
                    {product?.condition}
                  </span>
                </>
              )}
            </p>
            <p className={`rounded ${isLoading ? "skeleton h-5 w-1/2" : ""}`}>
              {!isLoading && (
                <>
                  Stock: {" "}
                  <span id="stock_status"
                  className={product?.stock > 0
                    ? `${productDetailsStyles.stockStatus} text-green-600`
                    : `${productDetailsStyles.stockStatus} text-red-600`}>
                    {product?.stock > 0 ? `In Stock ${product?.stock === 1 ? "(Only 1 left)" : ""}` : "Out of Stock"}
                  </span>
                </>
              )}
            </p>

            <hr/>
            
            <p className={`rounded ${isLoading ? "skeleton h-16 w-full" : ""}`}>
              {!isLoading && `Description: ${product?.description}`}
            </p>
            <p className={`rounded ${isLoading ? "skeleton h-5 w-full" : ""}`}>
              {!isLoading && (
                <>
                  Sold by: {" "}
                  <strong>{product?.seller}</strong>
                </>
              )}
            </p>
          </Col>
        </Row>
      </Container>
    </>
  )
}