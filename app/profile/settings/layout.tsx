"use client";

import { ReactNode, useEffect } from "react";

export default function ProfileLayout({ children }: { children: ReactNode }){
  useEffect(() =>{
    document.title = `Settings`
  });

  return(
    <section>
      {children}
    </section>
  );
}