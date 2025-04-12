import React, { useEffect, useState } from 'react';
import logo from '../assets/logo.png';
import { FaUser, FaBars } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import {
  NavWrapper,
  LeftSection,
  BrandText,
  CenterLinks,
  StyledNavLink,
  RegisterButton,
  Icon,
} from '../styles/Navbar.styled'; 

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <NavWrapper scrolled={scrolled}>
      <LeftSection>
        <img src={logo} width="50" height="50" alt="Craftopia Logo" />
        <BrandText>Craftopia</BrandText>
      </LeftSection>

      <CenterLinks>
        <StyledNavLink as={ScrollLink} to="home" smooth={true} duration={100}>
          Home
        </StyledNavLink>
        <StyledNavLink as={ScrollLink} to="features" smooth={true} duration={100}>
          Features
        </StyledNavLink>
        <StyledNavLink as={ScrollLink} to="reviews" smooth={true} duration={100}>
          Reviews
        </StyledNavLink>
        <StyledNavLink as={ScrollLink} to="contact" smooth={true} duration={100}>
          Contact Us
        </StyledNavLink>
      </CenterLinks>

      <RegisterButton>
        <Icon><FaUser /></Icon>
        <Icon><FaBars /></Icon>
      </RegisterButton>
    </NavWrapper>
  );
};

export default NavbarComponent;
