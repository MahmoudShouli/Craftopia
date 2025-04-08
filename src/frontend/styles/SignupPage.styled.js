import styled from "styled-components";
import { Form, Button } from "react-bootstrap";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  * {
    font-family: inherit !important;
  }
`;

export const SidebarSection = styled.div`
  width: 35%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const RightSection = styled.div`
  width: 65%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const FormWrapper = styled.div`
  width: 75%;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 2rem;
`;

export const InputGroupWrapper = styled.div`
  position: relative;
  margin-bottom: 1rem;

  i {
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
    color: #6a380f;
    font-size: 1.2rem;
  }

  input {
    padding-left: 3.5rem;
  }
`;

export const StyledInput = styled(Form.Control)`
  background-color: #f7e9d7;
  color: #6a380f;
  font-weight: 600;
  border: 1px solid #ccc;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  width: 100%;

  &:focus {
    box-shadow: none;
    border-color: #999;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #6a380f;
  border: 1px solid #6a380f;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  margin-top: 10%;

  &:hover {
    background-color: #f7e9d7;
    color: #6a380f;
    border-color: #f7e9d7;
  }

  &:focus {
    box-shadow: none;
  }
`;

export const StyledTitle = styled.h3`
  font-size: 2rem;
  font-weight: bold;
  color: #6a380f;
  margin-bottom: 1.5rem;
`;

export const RoleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 1rem;
`;

export const RoleButton = styled(Button)`
  background-color: ${({ active }) => (active ? "#6a380f" : "#f7e9d7")};
  border: 1px solid #ccc;
  color: ${({ active }) => (active ? "white" : "#6a380f")};
  font-weight: 600;
  padding: 0.6rem 1rem;
  border-radius: 8px;
  transition: background-color 0.3s ease;
  display: flex;
  align-items: center;
  gap: 8px;

  &:hover {
    background-color: #6a380f;
    color: white;
  }

  &:focus {
    box-shadow: none;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 20%;
`;
