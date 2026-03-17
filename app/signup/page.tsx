import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import Signup from "@/components/client/pages/Signup";

export default async function SignupPage(){
  const cookieStore = await cookies();
  const token = cookieStore.get("token");
  
  if(token){
    redirect("/");
  }

  return(
    <>
      <Signup/>
    </>
  );
}