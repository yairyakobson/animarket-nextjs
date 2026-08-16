"use client"

import Link from "next/link";
import { Col, Image } from "react-bootstrap";

import SearchedProductsSidebar from "../layout/SearchedProductsSidebar";
import MobileFiltering from "../layout/Navbar/MobileFiltering";

import { SearchedProductsMapping } from "../clientInterfaces/productInterfaces/searchedProductsProps";

import { ProductRating } from "../layout/ProductRating";

import searchedProductsStyles from "../styles/layoutStyles/searchProducts.module.scss"
import userProductsStyles from "../styles/userStyles/userProducts.module.scss";

const SearchedProducts: React.FC<SearchedProductsMapping> = ({ searchedProducts }) =>{
  return(
    <>
      <section className={searchedProductsStyles.searchedWrapper}>
        <SearchedProductsSidebar/>
        <section className="mb-4 mt-[1.5rem]">
          <MobileFiltering/>
        </section>

        <section className={searchedProductsStyles.resultsColumn}>
          <h1 className="mb-4 text-center mt-3">
            {searchedProducts && searchedProducts.length > 0 ? (
              <span>Found {searchedProducts.length} Products</span>
            ) : (
              <span>No Products found</span>
            )}
          </h1>

          {!searchedProducts || searchedProducts.length === 0 ? (
            <section className="text-center p-5 mt-10">
              <p className="text-gray-500 mt-2">Try adjusting your filters or searching for something else.</p>
            </section>
          ) : (
            <section className={searchedProductsStyles.searchedContent}>
              {searchedProducts.map((product) =>(
                <section key={product?.id} className="card w-[15rem] h-[15rem]">
                  <figure className="relative w-full h-[12.5rem] bg-neutral">
                    <Image
                      src={(product?.url as string) || "/placeholder.webp"}
                      alt={product?.name}
                      className="w-full h-full"/>
                  </figure>

                  <section className="card-body justify-between">
                    <h5 className="card-title">
                      <Link
                        href={`/product/${product?.id}`}
                        className="text-decoration-none text-black">
                        {product?.name}
                      </Link>
                    </h5>
                    <section className="flex items-center gap-2">
                      <ProductRating
                      rating={product?.averageRating}
                      isReadOnly={true}/>
                      <Col as="span" className="leading-none transform -translate-y-[1.5px]">
                        ({product?.averageRating})
                      </Col>
                    </section>

                    <section className="card-actions items-center justify-end">
                      <section className={`${userProductsStyles.priceBadge} badge-outline mt-2`}>
                        {"$" + product?.price}
                      </section>
                    </section>
                  </section>
                </section>
              ))}
            </section>
          )}
        </section>
      </section>
    </>
  );
};

export default SearchedProducts;