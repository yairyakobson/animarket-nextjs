import NewProduct from "@/components/client/pages/sidebar/NewProduct";
import UserSidebar from "@/components/client/layout/UserSidebar";

export default async function NewProductPage(){
  return(
    <>
      <UserSidebar>
        <NewProduct/>
      </UserSidebar>
    </>
  );
}