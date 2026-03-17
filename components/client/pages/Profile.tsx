"use client";

import { Button, Col, Container } from "react-bootstrap";

import { ProfileProps } from "../clientInterfaces/pages/profileProps";

import profileStyles from "../styles/profile.module.scss";

export default function Profile({ username, email }: ProfileProps){
  return(
    <>
      <Container as="section" className={profileStyles.profileContainer}>
        <Col as="section" className={profileStyles.profileData}>
          <h2 className={profileStyles.pageTitle}>My Account</h2>

          <Col as="section" className={`${profileStyles.data} mb-2`}>
            <span className="font-bold">
              Username:
            </span>
            <span>
              {username}
            </span>
          </Col>
          <Col as="section" className={profileStyles.data}>
            <span className="font-bold">
              Email Address:
            </span>
            <span>
              {email}
            </span>
          </Col>
        </Col>
      </Container>

      <Container as="section" className={profileStyles.profileContainer}>
        <Col as="section" className={`${profileStyles.data} mb-2`}>
          <Button variant="danger" className="mt-5">Delete Account</Button>
        </Col>
      </Container>
    </>
  )
}