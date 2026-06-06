"use client"

import Link from "next/link";
import { useMemo, useState } from "react";
import { Col, Container, Image } from "react-bootstrap";
import { Rating } from "react-simple-star-rating";

import { SORTING_STRATEGIES } from "../../constants/product/productConstants";
import { UserProductsMapping } from "../../clientInterfaces/userProductsMapping";

import UserProductsNavbar from "../../layout/UserProductsNavbar";

import userProductsStyles from "../../styles/userProducts.module.scss";

const UserProducts = ({ userProducts }: UserProductsMapping) =>{
  const [sortBy, setSortBy] = useState<string>("Name (A-Z)");

  const sortedProducts = useMemo(() =>{
    if(!userProducts) return [];
    
    // Fall back gracefully to Name (A-Z) sorting if the filter key isn't found
    const currentStrategy = SORTING_STRATEGIES[sortBy];
    
    return [...userProducts].sort(currentStrategy);
  }, [userProducts, sortBy]);
  
  return(
    <>
      <UserProductsNavbar sortBy={sortBy} onSortChange={setSortBy}/>
      <Container className="!grid mt-3
      !gap-y-4 justify-items-center
      md:!grid-cols-2
      lg:!grid-cols-2
      xl:!grid-cols-3">
        {sortedProducts.map((product) =>(
          <section key={product.id}
          className="card !max-w-full shadow-sm
          md:w-[20rem]">
            <figure>
              <Image
              src={product?.url || "/placeholder.webp"}
              alt={product?.name}
              className="!w-full !h-[15rem]"/>
            </figure>
            <section className="card-body">
              <h5 className="card-title gap-2">
                <Link href={`/product/${product.id}`}
                className="text-decoration-none text-black">{product.name}</Link>
                <section className="badge badge-outline text-black">{product.category}</section>
              </h5>
              <p>{product.description}</p>
              <section className="card-actions justify-end">
                <Rating
                iconsCount={5}
                initialValue={product?.averageRating as number}
                allowFraction={true}
                fillColor="#FFA41C"
                size={22}
                readonly
                SVGclassName="inline-block"/>
                <Col as="section" className="mt-[0.1rem]">
                  ({product.averageRating})
                </Col>
                <section
                className={`${userProductsStyles.priceBadge} badge-outline`}>
                  {"$" + product.price}
                </section>
              </section>
            </section>
          </section>
        ))}
      </Container>
    </>
  );
}

export default UserProducts;