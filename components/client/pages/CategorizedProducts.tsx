"use client"

import Link from "next/link";
import { Col, Container, Image } from "react-bootstrap";

import { CategorizedProductsMapping } from "../clientInterfaces/pageInterfaces/categorizedProps";
import { ProductRating } from "../layout/ProductRating";

import userProductsStyles from "../styles/userProducts.module.scss";

const CategorizedProducts = ({ categoryProducts }: CategorizedProductsMapping) =>{
  return(
    <> 
      <Container className={userProductsStyles.userProductsContainer}>
        {categoryProducts?.map((categoryProduct) =>(
          <section key={categoryProduct?.id}
          className="card !max-w-full shadow-sm mb-3
          md:flex w-[20rem]">
            <figure>
              <Image
              src={categoryProduct?.url || "/placeholder.webp"}
              alt={categoryProduct?.name}
              className="!w-full !h-[15rem]"/>
            </figure>
            <section className="card-body">
              <h5 className="card-title gap-2">
                <Link href={`/product/${categoryProduct?.id}`}
                className="text-decoration-none text-black">{categoryProduct?.name}</Link>
              </h5>
              <p>{categoryProduct?.description}</p>
              <section className="card-actions justify-end">
                <ProductRating
                rating={categoryProduct?.averageRating}
                className="1.5rem"
                isReadOnly={true}/>
                <Col as="section" className="leading-none transform translate-y-[5px]">
                  ({categoryProduct?.averageRating})
                </Col>
                <section
                className={`${userProductsStyles.priceBadge} badge-outline`}>
                  {"$" + categoryProduct?.price}
                </section>
              </section>
            </section>
          </section>
          ))}
      </Container>
    </>
  );
}

export default CategorizedProducts;