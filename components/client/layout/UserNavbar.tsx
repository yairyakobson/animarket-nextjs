"use client"

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container, Image, Navbar } from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";

import MobileNavbar from "./Navbar/MobileNavbat";
import DesktopNavbar from "./Navbar/DesktopNavbar";
import SearchInput from "./SearchInput";

import navbarStyles from "../styles/layoutStyles/navbar.module.scss";

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
      <Navbar expand="md"
      className={navbarStyles.navbarSpace}
      hidden={hiddenPaths}>
        <Container as="section" fluid>
          <Navbar.Brand href="/">
            <picture className={navbarStyles.logoWrapper}>
              <source media="(width < 576px)" srcSet="/icon.webp"/>
              <Image src="/logo.webp"
              alt="Animarket Logo"
              className={navbarStyles.logo}/>
            </picture>
          </Navbar.Brand>
          <SearchInput/>
          <Navbar.Toggle aria-controls="offcanvasNavbar-expand-md"
          className={navbarStyles.customToggler}>
            <RxHamburgerMenu color="white"
            size="2rem"/>
          </Navbar.Toggle>
            <MobileNavbar/>
            <DesktopNavbar/>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;