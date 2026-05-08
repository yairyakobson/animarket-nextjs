"use client"

import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

import { FiSettings, FiUser } from "react-icons/fi";

import { useAppSelector } from "../hooks/useAppSelector";
import { SidebarPagesProps } from "../clientInterfaces/sidebarInterface";

import sidebarStyles from "../styles/sidebar.module.scss";

export default function SidebarConfig(){
  const pathName = usePathname();

  const { user } = useAppSelector((state) => state.user);

  const menuItems: SidebarPagesProps[] = [
    { name: "Profile", url: `/profile/${user?.name}`, icon: FiUser },
    { name: "Settings", url: "/profile/settings", icon: FiSettings }
  ];

  return(
    <>
      <section className="container">
        {menuItems?.map((menuItem, index) =>{
          const isActive = pathName === menuItem.url;
          const Icon = menuItem.icon;

          return(
            <React.Fragment key={index}>
              <Link key={index} href={menuItem.url}
              className={`${sidebarStyles.sidebarLink}
                ${isActive ? "font-semibold" : ""}`}>
                <Icon className={sidebarStyles.sidebarIcon}
                aria-disabled={true}/>
                <section className={sidebarStyles.sidebarContentContainer}>
                  <span className={sidebarStyles.sidebarContent}>
                    {menuItem.name}
                  </span>

                  <span className={sidebarStyles.sidebarGhostContent}
                  aria-hidden="true">
                    {menuItem.name}
                  </span>
                </section>
              </Link>
            </React.Fragment>
          )
        })}
      </section>
    </>
  );
};