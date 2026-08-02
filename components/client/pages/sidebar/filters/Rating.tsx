"use client"

import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { Form } from "react-bootstrap";

import { ProductRating } from "@/components/client/layout/ProductRating";

export const RatingSearch = () =>{
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramName = "rating";

  const ratingHandler = (rating: string, isChecked: boolean) =>{
    const params = new URLSearchParams(searchParams.toString());

    if(!isChecked){
      params.delete(paramName);
    }
    else{
      params.set(paramName, rating);
    }

    const search = params.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  const isChecked = (starsValue: string) =>{
    return searchParams.get("rating") === starsValue;
  };

  return(
    <>
      <h5 className="mt-3">Ratings</h5>
      {[5,4,3,2,1].map(stars =>{
        const starsStr = stars.toString();

        return(
          <Form.Check key={stars}>
            <Form.Check.Input type="checkbox"
            name="rating"
            id={`rating-${stars}`}
            value={stars}
            checked={isChecked(starsStr)}
            onChange={(e) => ratingHandler(starsStr, e.target.checked)}/>
            <ProductRating
            rating={stars}
            className="1.5rem"
            isReadOnly={true}/>
          </Form.Check>
        )
      })}
    </>
  )
}