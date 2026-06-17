import { LatestProductsProps } from "../../type/product/latestProps";
import { TopRatedProductsProps } from "../../type/product/topRatedProps";

export interface HomeProps{
  topRatedProducts: TopRatedProductsProps[];
  latestProducts: LatestProductsProps[];
}