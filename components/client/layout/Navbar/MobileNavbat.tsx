"use client"

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Button,
  Nav,
  Navbar,
  Offcanvas
} from "react-bootstrap";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useLazyLogoutUserQuery } from "../../redux/services/authApi";

import navbarStyles from "../../styles/navbar.module.scss";

function MobileNavbar(){
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
      <Navbar.Offcanvas placement="end">
        <Offcanvas.Header closeButton>
          <Image
          key={activeSrc}
          src={activeSrc}
          alt={`${user?.name}`}
          width={0}
          height={0}
          priority
          unoptimized
          className={`${navbarStyles.profileImage}`}/>
      
          <Offcanvas.Title>
            <Navbar.Text className={navbarStyles.userName}>
              <b>{user?.name}</b>
            </Navbar.Text>
          </Offcanvas.Title>
        </Offcanvas.Header>

        <Offcanvas.Body>
          <Nav className="md:!hidden">
            <Nav.Link href={`/profile/${user?.name}`}>
              Profile
            </Nav.Link>
      
            <Nav.Link href="/profile/settings">
              Settings
            </Nav.Link>
      
            <Button variant="danger" onClick={handleLogout}>
              Logout
            </Button>
          </Nav>
        </Offcanvas.Body>
      </Navbar.Offcanvas>
    </>
  );
}

export default MobileNavbar;