import { ProductReviewProps } from "@/components/client/type/reviewsType";

export const REVIEW_STRATEGIES: Record<
  string, (
  a: ProductReviewProps,
  b: ProductReviewProps) => number> = {
  "Date": (a, b) => {
    const timeA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
    const timeB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
    
    const dateDiff = timeB - timeA;
    
    if(dateDiff !== 0){
      return dateDiff;
    };
    
    return a.reviewer.localeCompare(b.reviewer);
  },
  "Rating": (a, b) => {
    const ratingDiff = Number(b.rating) - Number(a.rating);
    
    if(ratingDiff !== 0){
      return ratingDiff;
    }
    
    return a.reviewer.localeCompare(b.reviewer);
  },
};

export const REVIEW_FILTERS = Object.keys(REVIEW_STRATEGIES);