import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Signin from "@/components/client/pages/Signin";

export default async function SigninPage(){
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
    
  if(token){
    redirect("/");
  }

  return(
    <>
      <Signin/>
    </>
  );
}