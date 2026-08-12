"use client"

import { useState } from "react";
import { TfiAlignLeft } from "react-icons/tfi";
import { IoIosClose } from "react-icons/io";

import SearchbarConfig from "../SearchbarConfig";

function MobileFiltering() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <section className="lg:hidden">
        <TfiAlignLeft
        onClick={() => setIsDrawerOpen(true)}
        className="cursor-pointer"
        size="1.5rem"/>
      </section>
      {isDrawerOpen && (
        <section className="fixed inset-0 z-50">
          <section
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsDrawerOpen(false)}/>

          <aside className="absolute left-0 top-0 h-full w-[20rem] bg-gray-200">
            <button
              type="button"
              onClick={() => setIsDrawerOpen(false)}
              className="btn btn-sm btn-circle absolute right-4 top-0"
              aria-label="Close filters">
              <IoIosClose
              size="2rem"/>
            </button>

            <section className="h-full overflow-y-auto p-4">
              <SearchbarConfig/>
            </section>
          </aside>
        </section>
      )}
    </>
  );
}

export default MobileFiltering;