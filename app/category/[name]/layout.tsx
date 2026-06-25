"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

export default function ProductLayout({ children }: { children: ReactNode }){
  const params = useParams();

  useEffect(() =>{
    document.title = `${params?.name as string}`
  });

  return(
    <section>
      {children}
    </section>
  );
}