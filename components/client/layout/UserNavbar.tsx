"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Navbar } from "react-bootstrap";

import MobileNavbar from "./Navbar/MobileNavbat";
import DesktopNavbar from "./Navbar/DesktopNavbar";

import navbarStyles from "../styles/navbar.module.scss";

function UserNavbar(){
  const pathname = usePathname();
  const [_, setMounted] = useState(false);

  useEffect(() =>{
    setMounted(true);
  }, []);

  const hiddenPaths = pathname.includes("/email/verify")
  || pathname.includes("/reset-password");

  return(
    <>
      <Navbar expand="md" bg="black"
      className={navbarStyles.navbarSpace}
      hidden={hiddenPaths}>
        <Container as="section" fluid>
          <Navbar.Brand href="/"
          className="text-white">Animarket</Navbar.Brand>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md"
          className="border border-white bg-white"/>
            <MobileNavbar/>
            <DesktopNavbar/>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;