"use client";

import { Form } from "react-bootstrap";
import { useSearchParams, useRouter } from "next/navigation";

function SearchInput(){
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const userTypedQuery = formData.get("searchInput")?.toString()?.trim(); // Grabs keyword from Form Input

    if (!userTypedQuery) return; // safety for not writing anything in the search input

    const queryStructure = userTypedQuery
    .replace(/\+/g, "%2B")
    .replace(/\s+/g, "+");

    const currentQueries = new URLSearchParams(searchParams.toString());

    router.push(`/results/${queryStructure}?${currentQueries.toString()}`);
  };

  return(
    <Form onSubmit={handleSearchSubmit} className="!flex !flex-auto px-5">
      <Form.Control
      type="search"
      name="searchInput"
      placeholder="Search"
      className="me-2"
      aria-label="Search"/>
    </Form>
  );
}

export default SearchInput;