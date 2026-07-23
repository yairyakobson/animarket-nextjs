"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Form } from "react-bootstrap";

import { PRODUCT_CATEGORIES } from "@/components/client/constants/categories/productConstants";

export const Category = () =>{
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const paramName = "category";

  const categoryList = Object.values(PRODUCT_CATEGORIES);

  const categoryHandler = (category: string, isChecked: boolean) =>{
    const params = new URLSearchParams(searchParams.toString());

    // If clicking the currently selected rating, toggle it off
    if(!isChecked){
      params.delete(paramName);
    }
    else{
      params.set(paramName, category);
    }

    const search = params.toString();
    const query = search ? `?${search}` : "";
    router.push(`${pathname}${query}`);
  }

  const isChecked = (categoryValue: string) =>{
    return searchParams.get("category") === categoryValue;
  };
  
  return(
    <>
      <h5 className="mt-3">Categories</h5>
      {categoryList?.map((category) =>{
        const categoriesStr = category.toString();

        return(
          <Form.Check key={category}>
            <Form.Check className="!text-md"
            name="category"
            value={category}
            label={category}
            checked={isChecked(categoriesStr)}
            onChange={(e) => categoryHandler(categoriesStr, e.target.checked)}/>
          </Form.Check>
        )
      })}
    </>
  );
};