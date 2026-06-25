"use client"

import { Container } from "react-bootstrap";

import { HomeProps } from "../clientInterfaces/pageInterfaces/homepageProps";

import TopRatedProducts from "../layout/Products/TopRated";
import LatestProducts from "../layout/Products/Latest";
import ProductCategories from "../layout/Products/Categories";

import homepageStyles from "../styles/homepage.module.scss";

export default function Home({ topRatedProducts, latestProducts, productCategories }: HomeProps){
  return(
    <>
      <section className="hero flex-grow">
        <section className="hero-overlay bg-gray-500">
          <section>
            <Container as="section" fluid="2xl"
            className={homepageStyles.productsContainer}>
              <TopRatedProducts topRatedProducts={topRatedProducts}/>
              <LatestProducts latestProducts={latestProducts}/>
            </Container>
            <Container as="section" fluid
            className="mt-5 px-4">
              <ProductCategories productCategories={productCategories}/>
            </Container>
          </section>
        </section>
      </section>
    </>
  );
}