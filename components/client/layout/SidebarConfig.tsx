"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef } from "react";
import { ListGroup } from "react-bootstrap";

import { SidebarProps } from "../clientInterfaces/sidebarInterface";

const SidebarConfig: React.FC<SidebarProps> = ({ menuItems }) =>{
  const pathName = usePathname();
  const menuRef = useRef(pathName);

  const handleMenuItemClick = (menuItemUrl: string) =>{
    menuRef.current = menuItemUrl
  };

  return(
    <>
      <ListGroup as="section">
        {menuItems?.map((menuItem, index) =>{
          const isActive = menuRef.current.includes(menuItem.url);

          return(
            <Link key={index} href={menuItem.url}
            className={`!flex list-group-item list-group-item-action
              ${isActive ? "active" : ""}`}
            onClick={() => handleMenuItemClick(menuItem.url)}
            aria-current={menuRef.current.includes(menuItem.url) ? "true" : "false"}>
              {menuItem.name}
            </Link>
          )
        })}
      </ListGroup>
    </>
  );
};

export default SidebarConfig;