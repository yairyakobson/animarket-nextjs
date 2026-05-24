"use client"

import { useRef } from "react";

import NewProductForm from "../../forms/newProductForm";

const NewProduct = () =>{
  const newProductRef = useRef<{
    name: string;
    description: string;
    price: string;
    stock: string;
    category: string;
    condition: string;
  }>({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    condition: ""
  });

  const inputHandler = (e: React.ChangeEvent<HTMLInputElement
    | HTMLTextAreaElement
    | HTMLSelectElement
    >) =>{
    const { name, value } = e.target;
    if(name in newProductRef.current){
      newProductRef.current[name as keyof typeof newProductRef.current] = value;
    }
  };

  return(
    <>
      <NewProductForm
      productDataHandler={inputHandler}
      newProductRef={newProductRef}/>
    </>
  );
}

export default NewProduct;