import { Price } from "../pages/sidebar/filters/Price";
import { Category } from "../pages/sidebar/filters/Category";
import { RatingSearch } from "../pages/sidebar/filters/Rating";

export default function SearchbarConfig(){
  return(
    <>
      <section className="container">
        <Price/>
        <Category/>
        <RatingSearch/>
      </section>
    </>
  );
};