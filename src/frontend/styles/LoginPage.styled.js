import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  height: 100vh;
  overflow: hidden;
`;

export const LeftPanel = styled.div`
  width: 60%;
  background-color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
`;

export const Heading = styled.h2`
  color: #6a380f;
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const FormWrapper = styled.form`
  width: 100%;
  max-width: 350px;
  margin-top: -10rem;
`;

export const InputGroup = styled.div`
  background-color: #f7e9d7;
  display: flex;
  align-items: center;
  padding: 0.6rem 1rem;
  border-radius: 6px;
  margin-bottom: 0.5rem;
`;

export const StyledInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  width: 100%;
  color: #4b2e1e;
  padding-left: 0.5rem;
  font-size: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-bottom: 0.5rem;
  padding-top: 0.3rem;

  &::placeholder {
    color: #6a380f !important;
    opacity: 1;
  }
`;

export const ForgotPassword = styled.a`
  display: block;
  text-align: end;
  margin-bottom: 1rem;
  font-size: 1rem;
  color: #6a380f;
  text-decoration: none;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const SignInButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #6a380f;
  border: none;
  border-radius: 6px;
  color: white;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;

  &:hover {
    background-color: #f7e9d7;
    color: #6a380f;
  }
`;

export const GoogleButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #fff;
  color: #fff;
  background-color: #6a380f;
  border: none;
  border-radius: 6px;
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-top: 0.8rem;

  &:hover {
    background-color: #f7e9d7;
    color: #6a380f;
  }
`;

export const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transform: translateY(-190px);
`;

export const Logo = styled.img`
  width: 20%;
`;

export const Eye = styled.div`
  position: 'absolute',
  right: 8,
  top: '50%',
  transform: 'translateY(-50%)',
  cursor: 'pointer',
  color: '#6a380f'
`;
