"use client"

import Link from "next/link";
import { useMemo, useState } from "react";
import { Container, Image } from "react-bootstrap";

import { SORTING_STRATEGIES } from "../../constants/productConstants";
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
      !gap-4 justify-items-center
      md:!grid-cols-2
      lg:!grid-cols-2
      xl:!grid-cols-3">
        {sortedProducts.map((product) =>(
          <section key={product.id}
          className="card max-w-[25rem] shadow-sm
          md:w-[20rem]">
            <figure>
              <Image
              src={product?.url || "https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"}
              alt={product.name}/>
            </figure>
            <section className="card-body">
              <h5 className="card-title gap-2">
                <Link href={`/product/${product.id}`}
                className="text-decoration-none text-black">{product.name}</Link>
                <section className="badge badge-outline text-black">{product.category}</section>
              </h5>
              <p>{product.description}</p>
              <section className="card-actions justify-end">
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