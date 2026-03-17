import { Col, Container, Row } from "react-bootstrap";

import { getServerUser } from "@/components/server/utils/cookies/clientCookie";

import SidebarConfig from "./SidebarConfig";

import sidebarStyles from "../styles/sidebar.module.scss";

export default async function UserSidebar(
  { children }: { children: React.ReactNode })
{
  const user = await getServerUser()

  const menuItems = [
    { name: "Overview", url: `/profile/${user?.name}` },
    { name: "Settings", url: "/profile/settings" }
  ];

  return(
    <>
      <section>
        <h1 className={sidebarStyles.userSidebar}>
          {`${user?.name}'s Sidebar`}
        </h1>

        <Container as="section">
          <Row as="section">
            <Col as="section" lg={3}>
              <SidebarConfig menuItems={menuItems}/>
            </Col>
            <Col as="section" lg={9}>{children}</Col>
          </Row>
        </Container>
      </section>
    </>
  );
}