"use client";

import { ReactNode, useEffect } from "react";

import { useAppSelector } from "@/components/client/hooks/useAppSelector";

export default function ProfileLayout({ children }: { children: ReactNode }){
  const { user } = useAppSelector((state) => state.user);

  useEffect(() =>{
    document.title = `${user?.name}`
  });

  return(
    <section>
      {children}
    </section>
  );
}