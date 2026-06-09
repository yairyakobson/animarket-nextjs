import { fetchProductReviews } from "@/components/server/dataAccess/reviews";

export type ProductReviewProps =Awaited<ReturnType<typeof fetchProductReviews>>[number]