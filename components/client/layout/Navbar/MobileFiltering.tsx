"use client"

import { TfiAlignLeft } from "react-icons/tfi";

export default function MobileFiltering(){
  return(
    <label htmlFor="products-drawer" className="cursor-pointer mt-[1.5rem]
    lg:hidden">
      <TfiAlignLeft size="1.5rem"/>
    </label>
  );
}