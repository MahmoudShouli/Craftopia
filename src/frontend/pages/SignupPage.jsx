import WelcomeCard from '../components/WelcomeCard'; 
import CraftDropdown from '../components/CraftDropdown'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { FaUserAlt, FaPaintBrush } from 'react-icons/fa'; 
import logo from '../assets/favicon.png';
import { register } from '../api/authService'; 
import MapPopup from '../components/MapPopup';

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
  const [craft, setSelectedCraft] = useState('');
  // const [error, setError] = useState('');
  const [location, setLocation] = useState('');
  const [city, setCity] = useState('');
  const [showMap, setShowMap] = useState(false);



  const SubmitSignUp = async (e) => {
    e.preventDefault();

    const data = await register(name, email, password,location, role, craft);
    console.log("🔐 Register response:", data);

    if (data && data.success) {
      //setError("");
      alert("✅ Registered successfully!");
      // navigate("/"); // or redirect to login
    } else {
      //setError(data?.message || "Something went wrong");
    }
  };

  return (
    <PageWrapper>
    
      <WelcomeCard
          mainText="Start New Journey!"
          subText="Already have an account?"
          buttonText="Sign In"
          linkTo={"/"}
      />
    

      <RightSection>  
        <LogoSection>
          <Logo src={logo} alt="Craftopia Logo" />
        </LogoSection> 
        
        <FormWrapper>  
          <StyledTitle>Create Account</StyledTitle>

          <form onSubmit={SubmitSignUp} style={{ width: '100%' }}>
            <InputGroupWrapper>
              <i className="bi bi-person" />
              <StyledInput
                type="text"
                name="name"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </InputGroupWrapper>

            <InputGroupWrapper>
              <i className="bi bi-envelope" />
              <StyledInput
                type="email"
                name="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </InputGroupWrapper>

            <InputGroupWrapper>
              <i className="bi bi-lock" />
              <StyledInput
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </InputGroupWrapper>

            <InputGroupWrapper>
            <i className="bi bi-geo-alt" onClick={() => setShowMap(true)} style={{ cursor: "pointer" }} />
              <StyledInput
                type="text"
                name="location"
                placeholder="Address"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </InputGroupWrapper>

            <RoleWrapper>
              <label className="fw-bold mb-0" style={{ fontWeight: 600, color: "#6a380f"}}>
                Role:
              </label>
              
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

            {role === 'crafter' && (
              <CraftDropdown
                crafts={crafts}
                selectedCraft={craft}
                onSelectCraft={setSelectedCraft}
              />
            )}

            <StyledButton className="w-100" type="submit">
              Sign Up
            </StyledButton>
          </form>
        </FormWrapper>
      </RightSection>
      {showMap && (
        <MapPopup
          onClose={() => setShowMap(false)}
          onSelectCoordinates={(locationString) => setLocation(locationString)}
          onSelectCity={(locationString) => setCity(locationString)}
        />
      )}
    </PageWrapper>
  );
};

export default SignupPage;
