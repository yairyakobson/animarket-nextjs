"use client";

import { useParams } from "next/navigation";
import { ReactNode, useEffect } from "react";

import { useGetProductDetailsQuery } from "@/components/client/redux/services/productApi";

export default function ProductLayout({ children }: { children: ReactNode }){
  const params = useParams();
  const { data } = useGetProductDetailsQuery(params?.id);
  const product = data?.product;

  useEffect(() =>{
    document.title = `${product?.name}`
  });

  return(
    <section>
      {children}
    </section>
  );
}