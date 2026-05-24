import UserSidebar from "@/components/client/layout/UserSidebar";
import UserProducts from "@/components/client/pages/sidebar/UserProducts";

import { fetchUserProducts } from "@/components/server/dataAccess/products";
import { isAuthenticatedUser } from "@/components/server/utils/auth";

export default async function MyProductsPage(){
  const user = await isAuthenticatedUser();
  const seller = user?.name
  const fetchedProducts = await fetchUserProducts(seller);

  return(
    <>
      <UserSidebar>
        <UserProducts userProducts={fetchedProducts}/>
      </UserSidebar>
    </>
  );
}