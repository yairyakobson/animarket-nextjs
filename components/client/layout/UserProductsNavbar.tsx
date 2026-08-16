import Link from "next/link";

import { USER_PRODUCT_FILTERS } from "../constants/product/productConstants";
import { FilteringProps } from "../clientInterfaces/filteringProps";

import productsNavbarStyles from "../styles/layoutStyles/productNavbar.module.scss";

function UserProductsNavbar({ sortBy, onSortChange }: FilteringProps){
  return(
    <>
      <section className={productsNavbarStyles.navbarContainer}>
        <section className={productsNavbarStyles.navbarComponent}>
          <section>
            <label htmlFor="sort"
            className="text-lg font-bold">Sort by {" "}</label>
            <select id="sort"
            value={sortBy}
            onChange={(e) => onSortChange(e.target.value)}
            className={productsNavbarStyles.productFilters}>
              {USER_PRODUCT_FILTERS.map((filter, idx) =>(
                <option key={idx} value={filter}>{filter}</option>
              ))}
            </select>
          </section>

          <section>
            <Link href="/new_product"
            className={productsNavbarStyles.newProductButton}>
              New Product
            </Link>
          </section>
        </section>
      </section>
    </>
  );
}

export default UserProductsNavbar;