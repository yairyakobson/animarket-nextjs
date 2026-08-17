"use client"

import Link from "next/link";
import { Button, Col, Container, Image } from "react-bootstrap";

import { CategorizedProductsMapping } from "../clientInterfaces/pageInterfaces/categorizedProps";
import { ProductRating } from "../layout/ProductRating";

import userProductsStyles from "../styles/userStyles/userProducts.module.scss";

const CategorizedProducts: React.FC<CategorizedProductsMapping> = ({ categoryProducts }) =>{
  return(
    <> 
      <Container className={userProductsStyles.userProductsContainer}>
        {categoryProducts?.map((categoryProduct) =>(
          <section key={categoryProduct?.id} className="card w-[15rem] h-[15rem]">
            <figure className="relative w-full h-[12.5rem] bg-neutral">
              <Image
              src={categoryProduct?.url as string || "/placeholder.webp"}
              alt={categoryProduct?.name}
              className="w-full h-full"/>
            </figure>

            <section className="card-body justify-between">
              <h5 className="card-title">
                <Link href={`/product/${categoryProduct?.id}`}
                className="text-decoration-none text-black">{categoryProduct?.name}</Link>
              </h5>
            <section className="flex items-center gap-2">
              <ProductRating
              rating={categoryProduct?.averageRating}
              isReadOnly={true}/>
              <Col as="section" className="leading-none transform -translate-y-[1.5px]">
                ({categoryProduct?.averageRating})
              </Col>
            </section>

            <section className="card-actions justify-start">
              <section className={`${userProductsStyles.priceBadge} badge-outline`}>
                {"$" + categoryProduct?.price}
              </section>
            </section>
            <section>
              <section className="card-actions justify-end">
                <Button href={`/product/${categoryProduct?.id}`}
                className="text-decoration-none text-white bg-danger !border-0"
                size="sm">
                  Buy Now
                </Button>
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