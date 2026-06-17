import { Metadata } from "next";

import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import Navbar from "@/components/client/layout/Navbar";
import Providers from "./providers";
import Toasters from "./toasters";

import "./globals.css";

export const metadata: Metadata = {
  title: "Animarket",
  description: "Your one-stop shop for all things Anime"
};

export default async function RootLayout(
  { children }:{ children: React.ReactNode }
){
  const user = await getServerUser();
  const isAuthenticated = !!user;

  return(
    <>
      <html lang="en" data-scroll-behavior="smooth">
        <body>
          <Providers user={user}>
            <section className="flex flex-col min-h-dvh">
              <Navbar isAuthenticated={isAuthenticated}/>
              <main className="flex flex-col flex-grow">
                <link 
                href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.7/dist/css/bootstrap.min.css"
                rel="stylesheet"
                integrity="sha384-LN+7fdVzj6u52u30Kp6M/trliBMCMKTyK833zpbD+pXdCLuTusPj697FH4R/5mcr"
                crossOrigin="anonymous"/>
                {children}
              </main>
            </section>
          </Providers>
          <Toasters/>
        </body>
      </html>
    </>
  );
}