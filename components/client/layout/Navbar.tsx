"use client"

import MainNavbar from "./MainNavbar";
import UserNavbar from "./UserNavbar";

function Navbar({ isAuthenticated }: NavbarProps){
  return(
    <>
      {isAuthenticated ? <UserNavbar/> : <MainNavbar/>}
    </>
  );
}

export default Navbar;