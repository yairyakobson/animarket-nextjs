import { redirect } from "next/navigation";

import { ProfilePageProps } from "@/components/server/serverInterfaces/profileInterface";
import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import Profile from "@/components/client/pages/Profile";
import UserSidebar from "@/components/client/layout/UserSidebar";

export default async function ProfilePage({ params }: ProfilePageProps){
  const user = await getServerUser();

  if(!user){
    redirect(`/signin?redirect=/profile/${params.user}`);
  }

  return(
    <>
      <UserSidebar>
        <Profile
        username={user?.name}
        email={user?.email}
        createdAt={user?.createdAt}/>
      </UserSidebar>
    </>
  );
}