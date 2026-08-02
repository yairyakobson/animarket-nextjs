"use client"

import {
  usePathname,
  useRouter,
  useSearchParams
} from "next/navigation";
import { Button, Form } from "react-bootstrap";

import { getPriceQueryParams } from "./priceQueries";

export const Price = () =>{
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentMin = searchParams.get("minPrice") ?? "";
  const currentMax = searchParams.get("maxPrice") ?? "";

  const priceRangeHandler = (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const minPrice = formData.get("minPrice") as string;
    const maxPrice = formData.get("maxPrice") as string;

    const queryString = getPriceQueryParams(searchParams, { minPrice, maxPrice });
    const targetPath = queryString ? `${pathname}?${queryString}` : pathname;

    router.push(targetPath);
  };

  return(
    <section>
      <h5 className="mb-3 text-lg font-semibold">Price</h5>
      <Form onSubmit={priceRangeHandler} className="!flex !flex-col !gap-3">
        <section className="flex items-center gap-2">
          <input
          type="number"
          name="minPrice"
          placeholder="Min"
          defaultValue={currentMin}
          min="1"
          className="input input-bordered input-sm w-full"/>
          <span className="text-gray-400">-</span>
          <input
          type="number"
          name="maxPrice"
          placeholder="Max"
          defaultValue={currentMax}
          min="1"
          className="input input-bordered input-sm w-full"/>
        </section>

        <Button type="submit" className="btn btn-danger btn-sm w-full !shadow-none">
          Filter Price
        </Button>
      </Form>
    </section>
  );
};