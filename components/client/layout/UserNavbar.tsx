"use client"

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Button,
  Container,
  Nav,
  Navbar,
  Offcanvas
} from "react-bootstrap";

import { useAppSelector } from "../hooks/useAppSelector";
import { useLazyLogoutUserQuery } from "../redux/services/authApi";

import navbarStyles from "../styles/navbar.module.scss";

function UserNavbar(){
  const pathname = usePathname();
  const { user } = useAppSelector((state) => state.user);
  const [_, setMounted] = useState(false);

  const [logoutUser] = useLazyLogoutUserQuery();

  useEffect(() =>{
    setMounted(true);
  }, []);
  
  async function handleLogout(e: React.MouseEvent<HTMLButtonElement>){
    e.preventDefault();
    await logoutUser(user);
    window.location.replace("/");
  }

  const activeSrc = user?.url || user?.avatar || "";

  return(
    <>
      <Navbar expand={false} bg="primary" className={navbarStyles.navbarSpace}
      hidden={pathname.includes("/email/verify") || pathname.includes("/reset-password")}>
        <Container as="section" fluid>
          <Navbar.Brand href="/">Animarket</Navbar.Brand>
          <Navbar.Toggle/>
          <Navbar.Offcanvas placement="end">
            <Offcanvas.Header closeButton>
              <Image
              key={activeSrc}
              src={activeSrc}
              alt={`${user?.name}`}
              width={100}
              height={100}
              priority
              unoptimized
              className={navbarStyles.profileImage}/>
              <Navbar.Text className={navbarStyles.userName}>
                <b>{user?.name}</b>
              </Navbar.Text>
            </Offcanvas.Header>

            <Offcanvas.Body>
              <Nav>
                <Nav.Link href={`/profile/${user?.name}`}>My Account</Nav.Link>
                <Button variant="danger" onClick={handleLogout}>Logout</Button>
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default UserNavbar;