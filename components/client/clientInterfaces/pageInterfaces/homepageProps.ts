import { TopRatedProductsProps } from "../../type/product/topRatedProps";
import { LatestProductsProps } from "../../type/product/latestProps";
import { CategoriesProps } from "../../type/product/categoryProps";

export interface HomeProps{
  topRatedProducts: TopRatedProductsProps[];
  latestProducts: LatestProductsProps[];
  productCategories: CategoriesProps[];
}