import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import Home from "@/components/client/pages/Home";

export default async function Homepage(){
  const user = await getServerUser();
  const username = user ? user?.name : "Guest";

  return <Home username={username}/>
}