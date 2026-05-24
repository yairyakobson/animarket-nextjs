"use client"

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";

import { useAppSelector } from "../../hooks/useAppSelector";
import { useLazyLogoutUserQuery } from "../../redux/services/authApi";

import navbarStyles from "../../styles/navbar.module.scss";

function DesktopNavbar(){
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
      <Dropdown align="end" className="ms-auto !hidden
      md:!block">
        <Dropdown.Toggle as="button"
        className="bg-transparent border-0 p-0">
          <Image
          key={activeSrc}
          src={activeSrc}
          alt={`${user?.name}`}
          width={0}
          height={0}
          priority
          unoptimized
          className={navbarStyles.profileImage}/>
        </Dropdown.Toggle>
        
        <Dropdown.Menu>
          <Dropdown.Item
          className="!font-bold text-black"
          disabled={true}>
            {user?.name}
          </Dropdown.Item>
          <Dropdown.Item
          className="text-black text-sm"
          disabled={true}>
            {user?.email}
          </Dropdown.Item>
          <Dropdown.Divider/>

          <Dropdown.Item as={Link}
          href={`/profile/${user?.name}`}
          className="active:!bg-transparent text-black">
            Profile
          </Dropdown.Item>

          <Dropdown.Item as={Link}
          href="/profile/settings"
          className="active:!bg-transparent text-black">
            Settings
          </Dropdown.Item>

          <Dropdown.Item as={Link}
          href="/profile/settings"
          className="active:!bg-transparent text-black">
            My Products
          </Dropdown.Item>

          <Dropdown.Item onClick={handleLogout}
          className="active:!bg-transparent text-danger !font-semibold">
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DesktopNavbar;