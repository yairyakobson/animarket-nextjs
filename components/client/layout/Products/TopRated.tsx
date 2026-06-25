"use client"

import Link from "next/link";
import { Col, Image } from "react-bootstrap";

import { TopRatedProductsMapping } from "../../clientInterfaces/pageInterfaces/topProductsProps";
import { ProductRating } from "../ProductRating";

import topProductStyles from "../../styles/topProducts.module.scss";
import userProductsStyles from "../../styles/userProducts.module.scss";

const TopRatedProducts: React.FC<TopRatedProductsMapping> = ({ topRatedProducts }) =>{
  return(
    <>
      <section className={topProductStyles.topProductsWrapper}>
      <h3 className="text-center mt-3">Top Rated</h3>
      <section className={topProductStyles.topProductsContainer}>
        <section className={topProductStyles.topProductsContent}>
          {topRatedProducts?.map((product) => (
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
                  <section className={`${userProductsStyles.priceBadge} badge-outline`}>
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

export default TopRatedProducts;