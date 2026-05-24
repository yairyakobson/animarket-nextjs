"use client";

import { ReactNode, useEffect } from "react";

export default function ProductLayout({ children }: { children: ReactNode }){
  useEffect(() =>{
    document.title = "Create Your New Product"
  });

  return(
    <section>
      {children}
    </section>
  );
}