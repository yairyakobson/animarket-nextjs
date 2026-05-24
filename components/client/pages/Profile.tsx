"use client";

import { useMemo } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";

import { useAppSelector } from "../hooks/useAppSelector";
import { ProfileProps } from "../clientInterfaces/pageInterfaces/profileProps";

import profileStyles from "../styles/profile.module.scss";

export default function Profile({
  username,
  email,
  createdAt
}: ProfileProps){
  const { user } = useAppSelector((state) => state.user);

  const dateFormat = useMemo(() =>{
    return new Date(createdAt).toLocaleDateString("en-US", {
      month: "long",
      day: "2-digit",
      year: "numeric"
    });
  }, [createdAt]);

  const activeSrc = user?.url || user?.avatar;

  return(
    <>
      <Container as="section"
      className={profileStyles.profileContainer}>
        <Row as="section">
          <Col as="section" className={profileStyles.profileData}>
            <figure>
              <Image
              key={activeSrc}
              src={activeSrc}
              alt={`${user?.name}`}
              className={profileStyles.profileImage}/>
            </figure>

            <Col as="section" className={profileStyles.data}>
              <h4>Username</h4>
              <p>{username}</p>

              <h4>Email Address</h4>
              <p>{email}</p>

              <h4>Joined</h4>
              <p>{dateFormat}</p>
            </Col>
          </Col>
        </Row>
      </Container>
    </>
  )
}