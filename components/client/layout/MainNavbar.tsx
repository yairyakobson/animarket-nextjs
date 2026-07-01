"use client"

import { usePathname } from "next/navigation";
import { Container, Image, Nav, Navbar } from "react-bootstrap";
import { RxHamburgerMenu } from "react-icons/rx";

import SearchInput from "./SearchInput";

import navbarStyles from "../styles/layoutStyles/navbar.module.scss";

function MainNavbar(){
  const pathname = usePathname();

  const hiddenPaths = pathname.includes("/email/verify")
  || pathname.includes("/reset-password");

  return(
    <>
      <Navbar expand="sm"
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
          <Navbar.Toggle aria-controls="responsive-navbar-nav"
          className={navbarStyles.customToggler}>
            <RxHamburgerMenu color="white"
            size="2rem"/>
          </Navbar.Toggle>
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/signup" className="text-white">Sign Up</Nav.Link>
              <Nav.Link href="/signin" className="text-white">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;