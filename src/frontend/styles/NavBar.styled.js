import styled from "styled-components";
import { Button } from "react-bootstrap";

export const NavWrapper = styled.div`
  background-color: #f7e9d7;
  padding: 0.75rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
`;

export const BrandText = styled.span`
  color: #6a380f;
  font-weight: bold;
  font-size: 1.8rem;
  margin-left: 0.5rem;
`;

export const CenterLinks = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 2rem;
`;

export const StyledNavLink = styled.a`
  color: #6a380f;
  text-decoration: none;
  font-weight: bold;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  padding: 0.5rem 1rem;
  border: 2px solid #6a380f;
  border-radius: 8px;
  background-color: transparent;
  transition: all 0.2s ease-in-out;

  &:hover {
    background-color: #6a380f;
    color: white;
  }
`;

export const RegisterButton = styled(Button)`
  background-color: #6a380f !important;
  color: white;
  border: none;
  padding: 1.2rem 2rem;
  border-radius: 0 2rem 0 0;
  display: flex;
  align-items: center;
  font-weight: bold;

  &:hover {
    background-color: #5c320d !important;
  }

  svg {
    font-size: 1.2rem;
  }
`;
