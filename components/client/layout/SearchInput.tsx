import { useRouter } from "next/navigation";
import { Form } from "react-bootstrap";

function SearchInput(){
  const router = useRouter();

  const handleSearchSubmit = (e: React.SubmitEvent<HTMLFormElement>) =>{
    e.preventDefault();
    
    const formData = new FormData(e.currentTarget);
    const userTypedQuery = formData.get("searchInput")?.toString()?.trim();

    if (!userTypedQuery) return; 

    const queryStructure = encodeURIComponent(userTypedQuery);
    router.push(`/results/${queryStructure}`);
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