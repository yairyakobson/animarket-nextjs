import { UserProductsProps } from "../../type/userProductsType";

export const SORTING_STRATEGIES: Record<
  string, (
  a: UserProductsProps,
  b: UserProductsProps) => number> = {
  "Name (A-Z)": (a, b) => a.name.localeCompare(b.name),
  "Price: Low to High": (a, b) => parseFloat(a.price as string) - parseFloat(b.price as string),
  "Price: High to Low": (a, b) => parseFloat(b.price as string) - parseFloat(a.price as string),
  "Category": (a, b) => a.category.localeCompare(b.category),
  "Rating": (a, b) => {
    const ratingDiff = Number(b.averageRating) - Number(a.averageRating);
    
    if(ratingDiff !== 0){
      return ratingDiff;
    }
    
    return a.name.localeCompare(b.name);
  }
};

export const USER_PRODUCT_FILTERS = Object.keys(SORTING_STRATEGIES);