"use client"

import { usePathname } from "next/navigation";
import { Container, Nav, Navbar } from "react-bootstrap";

import navbarStyles from "../styles/navbar.module.scss";

function MainNavbar(){
  const pathname = usePathname();

  return(
    <>
      <Navbar bg="primary" className={navbarStyles.navbarSpace}
      hidden={pathname.includes("/email/verify") || pathname.includes("/reset-password")}>
        <Container as="section" fluid>
          <Navbar.Brand href="/">Animarket</Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/signup">Sign Up</Nav.Link>
              <Nav.Link href="/signin">Sign In</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default MainNavbar;