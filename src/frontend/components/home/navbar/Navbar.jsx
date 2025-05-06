import React, { useEffect, useState, useRef } from 'react';
import logo from '../../../assets/logo.png';
import { FaUser, FaBars } from 'react-icons/fa';
import { Link as ScrollLink } from 'react-scroll';
import { io } from "socket.io-client";
import {
  NavWrapper,
  LeftSection,
  BrandText,
  CenterLinks,
  StyledNavLink,
  RegisterButton,
  Icon,
  UserInfo,
  MenuPopup,
  AvatarWrapper
} from './NavBar.styled';
import { useUser } from '../../../context/UserContext';
import { useNavigate } from 'react-router-dom';
import UserAvatar from '../../useravatar/UserAvatar';

const socket = io.connect("http://localhost:3000");

const NavbarComponent = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, setUser } = useUser();
  const navigate = useNavigate();
  const menuRef = useRef();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (!user) {
      navigate('/signin');
    }
  };

  const toggleMenu = () => {
    setMenuOpen((prev) => !prev);
  };

  const handleLogout = () => {
    socket.emit("user_offline", user.email);
    sessionStorage.removeItem('user');
    setUser(null); // Clear context
    navigate('/');
  };

  return (
    <NavWrapper $scrolled={scrolled}>
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
        {user && (
          <AvatarWrapper onClick={handleUserClick}>
            <UserAvatar
              user={user}
              previewUrl={user.avatarUrl || null}
              width={40}
              height={40}
            />
          </AvatarWrapper>
        )}
        {!user && (
          <Icon onClick={handleUserClick}>
            <FaUser />
          </Icon>
        )}

        {user && <UserInfo>Hi {user.name}</UserInfo>}

        <Icon onClick={toggleMenu}>
          <FaBars />
        </Icon>

        {menuOpen && (
          <MenuPopup ref={menuRef}>
            {user ? (
              <>
                <div onClick={() => {
                    if (user?.role === 'customer') {
                      navigate('/userprofile');
                    } else if (user?.role === 'crafter') {
                      navigate('/crafterprofile');
                    }
                  }}>
                    Profile
                  </div>
                <div onClick={handleLogout}>Logout</div>
              </>
            ) : (
              <div onClick={() => navigate('/signin')}>Log In</div>
            )}
          </MenuPopup>
        )}
      </RegisterButton>
    </NavWrapper>
  );
};

export default NavbarComponent;
