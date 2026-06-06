"use client"

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { toast } from "sonner";
import { useAppSelector } from "../../hooks/useAppSelector";
import { useGetProductDetailsQuery } from "../../redux/services/productApi";
import { useSubmitReviewMutation, useGetProductReviewsQuery } from "../../redux/services/reviewApi";

const NewReview = () =>{
  const [show, setShow] = useState(false);
  const [isValid, setIsValid] = useState(false);

  const handleClose = () => setShow(false);

  const ratingRef = useRef(0);
  const commentRef = useRef("");

  const params = useParams();
  const router = useRouter();
  const { user } = useAppSelector((state) => state.user);
  const { data } = useGetProductDetailsQuery(params?.id);
  const { data: reviewData } = useGetProductReviewsQuery(params?.id);

  const [submitReview, { error, isLoading, isSuccess }] = useSubmitReviewMutation();
  const product = data?.product;

  // Checks if a product review exists
  const reviewsList = Array.isArray(reviewData?.product) ? reviewData.product : [];
  
  const existingUserReview = reviewsList.find(
    (rev: any) => rev.reviewer === user?.name
  );

  const isUpdating = Boolean(existingUserReview);

  const reviewHandler = async() =>{
    const reviewData = { 
      rating: ratingRef.current,
      comment: commentRef.current,
      productId: params?.id
    };
    try{
      await submitReview(reviewData).unwrap();
      handleClose();
    }
    catch(err){
      console.error("Failed to submit review:", err);
    }
  };

  useEffect(() =>{
    if(error){
      const err = error as { data?: { error: string } };
      toast.error(err.data?.error || "Something went wrong", {
        duration: 2000
      });
    }

    if(isSuccess){
      toast.success(isUpdating ? "Review Updated" : "Review Posted");
    }
    router.refresh();
  }, [error, isSuccess]);

  const openModal = () =>{
    ratingRef.current = existingUserReview?.rating;
    commentRef.current = existingUserReview?.comment;
    
    setIsValid(Boolean(existingUserReview)); 
    setShow(true);
  };

  const modalValidation = () =>{
    const ratingValue = ratingRef?.current > 0;
    const commentValue = commentRef?.current?.trim()?.length > 0;

    setIsValid(ratingValue && commentValue)
  }

  return(
    <>
      <Button variant="danger"
      className="mt-4"
      onClick={openModal}
      hidden={product?.seller === user?.name}>{isUpdating ? "Edit your review" : "Submit a review"}</Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Dialog>
          <Modal.Header>
            <Modal.Title>Submit Review</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Rating
            iconsCount={5}
            initialValue={ratingRef.current}
            fillColor="#FFA41C"
            size={35}
            onClick={(e) => {
              (ratingRef.current = e)
              modalValidation()
            }}
            SVGclassName="inline-block"/>
            <br/>
            <textarea
            name="review"
            rows={3}
            className="mt-3 w-full border-1 rounded"
            placeholder="Enter your comment"
            defaultValue={commentRef.current}
            onChange={(e) => {
              commentRef.current = e.target.value
              modalValidation()
            }}
            required>
            </textarea>

            <Button variant="danger"
            className="w-full mt-3"
            onClick={reviewHandler}
            disabled={isLoading || !isValid}>{isUpdating ? "Update" : "Submit"}</Button>
          </Modal.Body>
        </Modal.Dialog>
      </Modal>
    </>
  )
}

export default NewReview;