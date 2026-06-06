import Link from "next/link";

import { Button } from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

import { USER_PRODUCT_FILTERS } from "../constants/product/productConstants";
import { FilteringProps } from "../clientInterfaces/filteringProps";

import productsNavbarStyles from "../styles/productNavbar.module.scss";

function UserProductsNavbar({ sortBy, onSortChange }: FilteringProps){
  return(
    <>
      <section className={productsNavbarStyles.navbarContainer}>
        <section className={productsNavbarStyles.navbarComponent}>
          <section className={`hidden
          xl:flex flex-row gap-x-2 p-1`}>
            <Button type="submit" variant="danger"
            className="!border-0 !shadow-none !rounded">
              <RxHamburgerMenu size={20}/>
            </Button>
            <Button type="submit" variant="danger"
            className="!border-0 !shadow-none !rounded">
              <BsFillGrid3X3GapFill size={20}/>
            </Button>
          </section>

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