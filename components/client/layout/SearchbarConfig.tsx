import { Price } from "../pages/sidebar/filters/Price";
import { Category } from "../pages/sidebar/filters/Category";
import { RatingSearch } from "../pages/sidebar/filters/Rating";

export default function SearchbarConfig(){
  return(
    <>
      <section>
        <section className="mb-5">
          <Price/>
        </section>
        <section className="mb-5">
          <Category/>
        </section>
        <section>
          <RatingSearch/>
        </section>
      </section>
    </>
  );
};