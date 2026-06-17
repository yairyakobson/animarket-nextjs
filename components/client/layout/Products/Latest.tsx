"use client"

import Link from "next/link";
import { Col, Image } from "react-bootstrap";

import { LatestProductsMapping } from "../../clientInterfaces/pageInterfaces/latestProductsProps";
import { ProductRating } from "../ProductRating";

import userProductsStyles from "../../styles/userProducts.module.scss";

const LatestProducts: React.FC<LatestProductsMapping> = ({ latestProducts }) =>{
  return(
    <>
      <section className="bg-gray-200 w-full h-full">
      <h3 className="text-center mt-3">Latest</h3>
      <section className="w-full h-[27rem] mt-4 overflow-y-auto mb-3">
        <section className="w-full grid grid-cols-2 place-items-center gap-4
        md:grid-cols-1
        lg:grid-cols-2 gap-4">
          {latestProducts?.map((product) => (
            <section key={product?.id} className="card w-[15rem] h-[15rem]">
              <figure className="relative h-[12.5rem] w-full bg-neutral">
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