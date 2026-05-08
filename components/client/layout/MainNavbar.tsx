"use client"

import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

import navbarStyles from "../styles/navbar.module.scss";

function MainNavbar(){
  const pathname = usePathname();

  const hiddenPaths = pathname.includes("/email/verify")
  || pathname.includes("/reset-password");

  return(
    <>
      <Navbar expand="sm" bg="black"
      className={navbarStyles.navbarSpace}
      hidden={hiddenPaths}>
        <Container as="section" fluid>
          <Navbar.Brand href="/"
          className="text-white">Animarket</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav"
          className="border border-white bg-white"/>
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