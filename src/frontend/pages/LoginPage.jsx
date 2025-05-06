/* eslint-disable no-unused-vars */
import React from 'react';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import { AiFillEye, AiFillEyeInvisible } from 'react-icons/ai';
import WelcomeCard from '../components/welcomecard/WelcomeCard';
import logo from '../assets/favicon.png';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api/authService';
import { useUser } from '../context/UserContext';
import { io } from "socket.io-client";
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

const socket = io.connect("http://localhost:3000");

const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setUser} = useUser()
  const togglePassword = () => setShowPassword(prev => !prev);
  const handleNormalLogin = async () => {
    const data = await login(email, password);
    setUser(
      data.user
    );
  
     socket.emit("user_online", data.user.email);
     navigate('/');

  };

  return (
    <PageWrapper>
      <LeftPanel>
        <LogoSection>
          <Logo src={logo} alt="Craftopia Logo" />
        </LogoSection>

        <FormWrapper>
          <Heading style={{ marginBottom: '15px' }}>Sign in to Craftopia</Heading>

          <InputGroup>
            <FaEnvelope color="#6a380f" />
            <StyledInput onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" />
          </InputGroup>

          <InputGroup>
            <FaLock color="#6a380f" />
            <StyledInput onChange={(e) => setPassword(e.target.value)} type={showPassword ? 'text' : 'password'} placeholder="Password" />
            <Eye onClick={togglePassword}>
              {showPassword ? <AiFillEyeInvisible color="#6a380f" size={20} /> : <AiFillEye color="#6a380f" size={20} />}
            </Eye>
            
          </InputGroup>
          <ForgotPassword href="#">Forgot your password?</ForgotPassword>

          <SignInButton type="button" onClick={handleNormalLogin}>Sign In</SignInButton>

          <GoogleButton type="button">
            <FcGoogle size={20} />
            Sign in with Google
          </GoogleButton>
        </FormWrapper>
      </LeftPanel>

      <WelcomeCard
        mainText="Welcome Back!"
        subText="Don’t have an account?"
        buttonText="Sign Up"
        linkTo={"/signup"}
      />
    </PageWrapper>
  );
};

export default LoginPage;
