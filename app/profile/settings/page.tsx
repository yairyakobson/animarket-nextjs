import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import UserSidebar from "@/components/client/layout/UserSidebar";
import ChangePassword from "@/components/client/pages/settings/ChangePassword";
import UploadProfileImage from "@/components/client/pages/settings/UploadProfileImage";

export default async function UpdateUserPage(){
  const user = await getServerUser();

  return(
    <>
      <UserSidebar>
        <ChangePassword/>
        <UploadProfileImage initialUser={user}/>
      </UserSidebar>
    </>
  );
}