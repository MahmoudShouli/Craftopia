import WelcomeCard from '../components/WelcomeCard'; 
import CraftDropdown from '../components/CraftDropdown'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { Form, Button, Dropdown } from 'react-bootstrap';
import { FaUserAlt, FaPaintBrush } from 'react-icons/fa'; 
import logo from '../../../public/favicon.png';
import {
    PageWrapper,
    SidebarSection,
    RightSection,
    FormWrapper,
    InputGroupWrapper,
    StyledInput,
    StyledButton,
    StyledTitle,
    RoleWrapper,
    RoleButton,
    LogoSection,
    Logo,
  } from '../styles/SignupPage.styled'; 
  

const crafts = [
    'Plasterer',
    'Plumber',
    'Electrician',
    'Painter',
    'Tiler',
    'Carpenter',
    'Aluminum and Glass Technician',
    'Cleaner',
  ];

 


const SignupPage = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const [selectedCraft, setSelectedCraft] = useState('');


  return (
    <PageWrapper>

      <SidebarSection>

        <WelcomeCard
                mainText="Start New Journey!"
                subText="Already have an account?"
                buttonText="Sign In"
            />
      </SidebarSection>

      <RightSection>  

        <LogoSection>
          <Logo src={logo} alt="Craftopia Logo" />
        </LogoSection> 
        
      <FormWrapper>  

       

         
        <StyledTitle>Create Account</StyledTitle>

          <Form>
            <InputGroupWrapper>
              <i className="bi bi-person" />
              <StyledInput
                type="text"
                name="name"
                placeholder="Name"
                // Add state and handle changes for name
              />
            </InputGroupWrapper>

            <InputGroupWrapper>
              <i className="bi bi-envelope" />
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                // Add state and handle changes for email
              />
            </InputGroupWrapper>

            <InputGroupWrapper>
              <i className="bi bi-lock" />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                // Add state and handle changes for password
              />
            </InputGroupWrapper>

            <RoleWrapper>
              <Form.Label className="fw-bold mb-0" style={{ fontWeight: 600 }}>
                Role:
              </Form.Label>
              
              <RoleButton 
                onClick={() => setRole('customer')}
                active={role === 'customer'}
              >
                <FaUserAlt style={{ marginRight: '8px' }} />
                Customer
              </RoleButton>

              <RoleButton 
                onClick={() => setRole('crafter')}
                active={role === 'crafter'}
              >
                <FaPaintBrush style={{ marginRight: '8px' }} />
                Crafter
              </RoleButton>
            </RoleWrapper>

            {/* Conditionally render the Craft Dropdown only for Crafter role */}
            {role === 'crafter' && <CraftDropdown crafts={crafts} />}

            <StyledButton className="w-100">
              Sign Up
            </StyledButton>

          </Form>
        </FormWrapper>
        
      </RightSection>
    </PageWrapper>
  );
};

export default SignupPage;