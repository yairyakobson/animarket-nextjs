"use client"

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import { getPriceQueryParams } from "./priceQueries";

export const Price = () =>{
  const priceRef = useRef({
    min: "",
    max: ""
  });

  const router = useRouter();
  let [searchParams] = useSearchParams();

  const priceRangeHandler = (e: any) =>{
    e.preventDefault();
    
    const min = priceRef.current.min;
    const max = priceRef.current.max;

    searchParams = getPriceQueryParams(searchParams, "min", min);
    searchParams = getPriceQueryParams(searchParams, "max", max);

    const path = window.location.pathname + "?" + searchParams.toString();
    router.push(path);
  };

  return(
    <>
      <h5 className="mx-auto">Price</h5>
      <Form onSubmit={priceRangeHandler} className="p-0">
        <Row as="section">
          <Col as="section" md={3} lg={4} className="col-5">
            <Form.Control
            type="text"
            className="mt-1"
            placeholder="Min"
            name="minPrice"
            defaultValue={priceRef.current.min}/>
          </Col>

          <br />
          <Col as="section" md={3} lg={4} className="col-5">
            <Form.Control
            type="text"
            className="mt-1"
            placeholder="Max"
            name="maxPrice"
            defaultValue={priceRef.current.max}/>
          </Col>

          <Col as="section" className="col-2">
            <Button type="submit" className="btn-danger mt-1">Filter</Button>
          </Col>
        </Row>
      </Form>
    </>
  );
};