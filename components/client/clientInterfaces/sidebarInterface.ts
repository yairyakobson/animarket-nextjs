export interface SidebarPageProps{
  name: string;
  url: string;
}

export interface SidebarProps{
  menuItems: SidebarPageProps[];
}