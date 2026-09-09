"use client"

import { useEffect, useState } from "react";

import SearchbarConfig from "./SearchbarConfig";

import drawerStyles from "../styles/layoutStyles/drawer.module.scss";

export default function SearchedProductsSidebar(){
  const [disableTransition, setDisableTransition] = useState(false);

  useEffect(() =>{
    const mediaQuery = window.matchMedia("(min-width: 64rem)");

    const handleBreakpointChange = () =>{
      setDisableTransition(true);

      requestAnimationFrame(() =>{
        requestAnimationFrame(() => setDisableTransition(false));
      });
    };

    mediaQuery.addEventListener("change", handleBreakpointChange);
    return () => mediaQuery.removeEventListener("change", handleBreakpointChange);
  }, []);
  
  return(
    <>
      <input id="products-drawer" type="checkbox"
      className={drawerStyles.drawerCheckbox}/>
      <label htmlFor="products-drawer"
      className={drawerStyles.drawerBackdrop}/>
      <section className={`${drawerStyles.drawerSidebar}
        ${disableTransition ? drawerStyles.noTransition : ""}`}>
        <ul className="menu p-4">
          <SearchbarConfig/>
        </ul>
      </section>
    </>
  );
}