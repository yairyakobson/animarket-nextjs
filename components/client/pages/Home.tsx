"use client"

import { Button } from "react-bootstrap";

import { HomeProps } from "../clientInterfaces/pages/homepageProps";

export default function Home({ username }: HomeProps){
  return(
    <>
      <section className="hero flex-grow bg-gray-200">
        <section className="hero-overlay bg-gray-500 flex flex-col !items-center !max-w-fill">
          <h1 className="mt-5 !text-5xl font-bold text-center">
            {`Welcome to Animarket ${username}`}
          </h1>
          <p className="mt-5 text-center max-w-xl">
            Your one-stop shop for everything Anime
          </p>
          <section>
            <Button className="mt-5 btn btn-danger !shadow-none" href="/signup">
              Get Started
            </Button>
          </section>
        </section>
      </section>
    </>
  );
}