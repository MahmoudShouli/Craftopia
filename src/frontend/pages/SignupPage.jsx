import WelcomeCard from '../components/welcomecard/WelcomeCard'; 
import CraftDropdown from '../components/craftdropdown/CraftDropdown'; 
import 'bootstrap-icons/font/bootstrap-icons.css';
import React, { useState } from 'react';
import { FaUserAlt, FaPaintBrush } from 'react-icons/fa'; 
import logo from '../assets/favicon.png';
import { register } from '../api/authService'; 
import { useNavigate } from 'react-router-dom'
import MapPopup from '../components/map/MapPopup';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
  const [location, setLocation] = useState('');
  const [avatarUrl] = useState('');
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [showMap, setShowMap] = useState(false);



  const SubmitSignUp = async (e) => {
    e.preventDefault();

    const [lat, lng] = location.split(',').map(Number)

    const geoLocation = {
      type: "Point",
      coordinates: [lng, lat],
    };

    const data = await register(name, email, password, geoLocation, role, craft , avatarUrl);

    if (data && data.success) {
      toast.success("Account created! Redirecting to Sign In...", {
        position: "top-center",
        autoClose: 2000,
        pauseOnHover: true,
        draggable: true,
      });
  
      setTimeout(() => {
        navigate("/signin");
      }, 2000);
    } else {
      toast.error(data?.message || "Something went wrong , try to enter another email", {
        position: "top-center",
        autoClose: 3000,
      });
    }
  };

  return (
    <PageWrapper>
      <WelcomeCard
          mainText="Start New Journey!"
          subText="Already have an account?"
          buttonText="Sign In"
          linkTo={"/signin"}
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
          isSearch={false}
        />
      )}
    </PageWrapper>
  );
};

export default SignupPage;
