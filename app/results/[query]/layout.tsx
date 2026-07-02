"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProductLayout({ children }: { children: ReactNode }){
  const params = useParams();
  const searchQuery = params?.query;

  useEffect(() =>{
    document.title = `Search results for ${decodeURIComponent(String(searchQuery))}`;
  });

  return(
    <section>
      {children}
    </section>
  );
}