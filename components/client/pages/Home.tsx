"use client";

import { Button } from "react-bootstrap";

import { HomeProps } from "../clientInterfaces/pages/homepageProps";

export default function Home({ username }: HomeProps){
  return(
    <section className="hero min-h-screen bg-red-400">
      <section className="hero-overlay !flex !flex-col !items-center !max-w-fill">
        <h1 className="mt-5 !text-5xl font-bold !text-neutral-content text-center">
          {`Welcome to Animarket ${username}`}
        </h1>
        <p className="mt-5 !text-zinc-300 text-center max-w-xl">
          Your one-stop shop for everything Anime
        </p>
        <section>
          <Button className="mt-5 btn btn-primary" href="/upload">
            Get Started
          </Button>
        </section>
      </section>
    </section>
  );
}