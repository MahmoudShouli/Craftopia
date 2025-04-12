import styled from "styled-components";
import { Button } from "react-bootstrap";

export const NavWrapper = styled.div`
  width: 100%;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  z-index: 100;
  transition: all 0.4s ease;

  backdrop-filter: ${({ scrolled }) => (scrolled ? "blur(10px)" : "none")};
  background-color: ${({ scrolled }) =>
    scrolled ? "rgba(247, 233, 215, 0.85)" : "transparent"};
  box-shadow: ${({ scrolled }) =>
    scrolled ? "0 2px 10px rgba(0,0,0,0.1)" : "none"};
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
`;

export const BrandText = styled.span`
  color: #6a380f;
  font-weight: bold;
  font-size: 1.8rem;
  margin-left: 0.5rem;
`;

export const CenterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const StyledNavLink = styled.a`
  color: #6a380f;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  background-color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;

  &:hover {
    background-color: #6a380f;
    color: white;
  }
`;

export const RegisterButton = styled(Button)`
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 0.7rem 1.5rem;
  border-radius: 0 1.5rem 0 0;
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 0.5rem;

  &:hover {
    background-color: #5c320d;
  }
`;

export const Icon = styled.span`
  font-size: 1.5rem;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
`;
