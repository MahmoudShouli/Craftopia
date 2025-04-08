/* eslint-disable no-unused-vars */
import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import WelcomeCard from '../components/WelcomeCard';
import logo from '../../../public/favicon.png';
import { useState } from 'react';
import {
  PageWrapper,
  LeftPanel,
  Heading,
  FormWrapper,
  InputGroup,
  StyledInput,
  ForgotPassword,
  SignInButton,
  GoogleButton,
  Logo,
  LogoSection,
  Eye
} from '../styles/LoginPage.styled'

const LoginPage = () => {

  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = () => setShowPassword(prev => !prev);

  const handleNormalLogin = async (e) => {
    e.preventDefault()

    

    
  }

  return (
    <PageWrapper>
      <LeftPanel>
        <LogoSection>
          <Logo src={logo} alt="Craftopia Logo" />
        </LogoSection>
        
        

        <FormWrapper>
          <Heading>Sign in to Craftopia</Heading>
          <InputGroup>
            <FaEnvelope color="#6a380f" />
            <StyledInput onChange={(e) => setUsername(e.target.value)} type="email" placeholder="Email" />
          </InputGroup>

          <InputGroup>
            <FaLock color="#6a380f" />
            <StyledInput onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password" />
            <Eye onClick={togglePassword}>
              {showPassword ? <AiFillEyeInvisible color="#6a380f" size={20} /> : <AiFillEye color="#6a380f" size={20} />}
            </Eye>
            
          </InputGroup>
          <ForgotPassword href="#">Forgot your password?</ForgotPassword>

          <SignInButton type="submit">Sign In</SignInButton>

          <GoogleButton type="button" onSubmit={handleNormalLogin}>
            <FcGoogle size={20} />
            Sign in with Google
          </GoogleButton>

          
          
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
