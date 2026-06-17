"use client"

import { Container } from "react-bootstrap";

import { HomeProps } from "../clientInterfaces/pageInterfaces/homepageProps";

import TopRatedProducts from "@/components/client/layout/Products/TopRated";
import LatestProducts from "@/components/client/layout/Products/Latest";

export default function Home({ topRatedProducts, latestProducts }: HomeProps){
  return(
    <>
      <section className="hero flex-grow">
        <section className="hero-overlay bg-gray-500">
          <section>
            <Container className="!grid !grid-cols-1
            md:!grid-cols-2 gap-x-12 mt-5 justify-items-center gap-y-12">
              <TopRatedProducts topRatedProducts={topRatedProducts}/>
              <LatestProducts latestProducts={latestProducts}/>
            </Container>
            <section className="justify-items-center grid grid-cols-1 mt-5">
              <h6 className="bg-white w-[10rem] h-[10rem] text-center">Shop By Category</h6>
            </section>
          </section>
        </section>
      </section>
    </>
  );
}