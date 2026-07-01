"use client"

import Link from "next/link";
import { Col, Image } from "react-bootstrap";

import { LatestProductsMapping } from "../../clientInterfaces/pageInterfaces/latestProductsProps";
import { ProductRating } from "../ProductRating";

import latestProductStyles from "../../styles/homepageStyles/latestProducts.module.scss";
import userProductsStyles from "../../styles/userStyles/userProducts.module.scss";

const LatestProducts: React.FC<LatestProductsMapping> = ({ latestProducts }) =>{
  return(
    <>
      <section className={latestProductStyles.latestProductsWrapper}>
      <h3 className="text-center mt-3">Latest</h3>
      <section className={latestProductStyles.latestProductsContainer}>
        <section className={latestProductStyles.latestProductsContent}>
          {latestProducts?.map((product) => (
            <section key={product?.id} className="card w-[15rem] h-[15rem]">
              <figure className="relative w-full h-[12.5rem] bg-neutral">
                <Image
                src={product?.url as string || "/placeholder.webp"}
                alt={product?.name}
                className="w-full h-full"/>
              </figure>

              <section className="card-body justify-between">
                <h5 className="card-title">
                  <Link href={`/product/${product?.id}`}
                  className="text-decoration-none text-black">{product?.name}</Link>
                </h5>
                <section className="flex items-center gap-2">
                  <ProductRating
                  rating={product?.averageRating}
                  className="1.5rem"
                  isReadOnly={true}/>
                  <Col as="section" className="leading-none transform -translate-y-[1.5px]">
                    ({product?.averageRating})
                  </Col>
                </section>

                <section className="card-actions items-center justify-end">
                  <section className={`${userProductsStyles.priceBadge} badge-outline mt-2`}>
                    {"$" + product.price}
                  </section>
                </section>
              </section>
            </section>
          ))}
          </section>
        </section>
      </section>
    </>
  )
}

export default LatestProducts;