import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import WelcomeCard from '../components/WelcomeCard';
import {
  PageWrapper,
  LeftPanel,
  Heading,
  FormWrapper,
  InputGroup,
  StyledInput,
  ForgotPassword,
  SignInButton,
  GoogleButton
} from '../styles/LoginPage.styled'

const LoginPage = () => {
  return (
    <PageWrapper>
      <LeftPanel>
        <Heading>Sign in to Craftopia</Heading>

        <FormWrapper>
          <InputGroup>
            <FaEnvelope color="#6a380f" />
            <StyledInput type="email" placeholder="Email" />
          </InputGroup>

          <InputGroup>
            <FaLock color="#6a380f" />
            <StyledInput type="password" placeholder="Password" />
          </InputGroup>

          <SignInButton type="submit">Sign In</SignInButton>

          <GoogleButton type="button">
            <FcGoogle size={20} />
            Sign in with Google
          </GoogleButton>

          <ForgotPassword href="#">Forgot your password?</ForgotPassword>
          
        </FormWrapper>
      </LeftPanel>

      <WelcomeCard
        mainText="Welcome Back!"
        subText="Don’t have an account?"
        buttonText="Sign Up"
      />
    </PageWrapper>
  );
};

export default LoginPage;
