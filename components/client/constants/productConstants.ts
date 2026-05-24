import { UserProductsProps } from "../type/userProductsType";

export const SORTING_STRATEGIES: Record<
  string, (
  a: UserProductsProps,
  b: UserProductsProps) => number> = {
  "Name (A-Z)": (a, b) => a.name.localeCompare(b.name),
  "Price: Low to High": (a, b) => parseFloat(a.price as string) - parseFloat(b.price as string),
  "Price: High to Low": (a, b) => parseFloat(b.price as string) - parseFloat(a.price as string),
  "Category": (a, b) => a.category.localeCompare(b.category),
};

export const USER_PRODUCT_FILTERS = Object.keys(SORTING_STRATEGIES);

export const PRODUCT_CATEGORIES = ["Manga", "Anime", "Fashion", "Accessories", "Miscellaneous"];
export const PRODUCT_CONDITION = ["New", "Like New", "Refurbished"]