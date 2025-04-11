import React from 'react';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import logo from '../assets/logo.png';
import { FaUser, FaBars } from 'react-icons/fa';
import {
    NavWrapper,
    LeftSection,
    BrandText,
    CenterLinks,
    StyledNavLink,
    RegisterButton
  } from '../styles/NavBar.styled';
  
const NavbarComponent = () => {
  return (
    <NavWrapper>
      <LeftSection>
        <img src={logo} width="75" height="75" alt="Craftopia Logo" />
        <BrandText>Craftopia</BrandText>
      </LeftSection>

      <CenterLinks>
        <StyledNavLink href="/">Home</StyledNavLink>
        <StyledNavLink href="#features">Features</StyledNavLink>
        <StyledNavLink href="#contact">Contact Us</StyledNavLink>
      </CenterLinks>

      <RegisterButton>
  <span><FaUser /></span>
  <span style={{ marginLeft: '35px' }}><FaBars /></span>
</RegisterButton>

    </NavWrapper>
  );
};

export default NavbarComponent;
