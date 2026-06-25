"use client"

import Link from "next/link";
import React, { useState } from "react";
import { Image } from "react-bootstrap";

import { CategoriesMapping } from "../../clientInterfaces/pageInterfaces/categoryProps";
import { PRODUCT_CATEGORIES } from "../../constants/categories/productConstants";

import categoryListStyles from "../../styles/categoryList.module.scss"

const ProductCategories: React.FC<CategoriesMapping> = () =>{
  const categoryList = Object.values(PRODUCT_CATEGORIES);

  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return(
    <>
      <section className={categoryListStyles.categoryListWrapper}>
      <h3 className="text-center p-3">Categories</h3>
      <section className={categoryListStyles.categoryListContainer}>
        <section className={categoryListStyles.categoryListContent}>
          {categoryList?.map((categoryList, id) =>(
            <section key={id} className="relative w-[13rem] mb-3 group"
            onMouseEnter={() => setHoveredId(id)}
            onMouseLeave={() => setHoveredId(null)}>

              <Image
              src={`/${categoryList}.webp`}
              alt="Category"
              className="w-full"/>
              <Link
                href={`/category/${categoryList}`}
                className={`
                ${categoryListStyles.categoryName}
                transition-opacity duration-300
                  ${hoveredId === id ? "opacity-100 bg-black/50" : "opacity-0"}
                `}>
                {categoryList}
              </Link>
            </section>
          ))}
          </section>
        </section>
      </section>
    </>
  )
}

export default ProductCategories;