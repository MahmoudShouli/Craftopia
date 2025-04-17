import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import lightLogo from "../assets/light-logo.png";
import { useUser } from "../context/UserContext"; 

// Sidebar items
const sidebarItems = [
  { icon: "🏠", label: "Home", route: "/" },
  { icon: "👤", label: "Profile", route: "/userprofile" },
  { icon: "🔎", label: "Search & filter" },  
  { icon: "📄", label: "Documents" },
  { icon: "🚪", label: "Logout", route: "/" },
];

const Dashboard = ({ defaultIndex = 0 ,  onViewChange }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(defaultIndex);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleItemClick = (index) => {
    const item = sidebarItems[index];
    setSelectedIndex(index);
  
    if (item.label === "Logout") {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } else if (item.label === "Search & filter") {
      onViewChange?.("search"); 
    } else if (item.label === "Profile") {
      onViewChange?.("profile"); 
      if (item.route) navigate(item.route);
    } else if (item.route) {
      navigate(item.route);
    }
  };

  return (
    <Sidebar
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      $expanded={isHovered}
    >
      <LogoWrapper>
        <LogoImage src={lightLogo} alt="Logo" $expanded={isHovered} />
      </LogoWrapper>

      {sidebarItems.map((item, index) => (
        <SidebarItem
          key={index}
          $expanded={isHovered}
          $active={selectedIndex === index}
          onClick={() => handleItemClick(index)}
        >
          <span className="icon">{item.icon}</span>
          <span className="label">{item.label}</span>
        </SidebarItem>
      ))}
    </Sidebar>
  );
};

export default Dashboard;
const Sidebar = styled.div`
  width: ${({ $expanded }) => ($expanded ? "15%" : "5%")};
  background-color: #6a380f;
  color: white;
  height: 100vh;
  transition: width 0.5s ease;
  display: flex;
  flex-direction: column;
  align-items: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  justify-content: flex-start;
  padding: 1rem 0;
`;

const LogoWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
`;

const LogoImage = styled.img`
  width: ${({ $expanded }) => ($expanded ? "128px" : "64px")};
  height: auto;
  transition: width 0.5s ease;
`;

const SidebarItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: ${({ $expanded }) => ($expanded ? "flex-start" : "center")};
  padding: 1rem 1.5rem;
  width: ${({ $expanded }) => ($expanded ? "85%" : "50px")};
  font-size: 1.2rem;
  height: 50px;
  gap: ${({ $expanded }) => ($expanded ? "1rem" : "0")};
  background-color: ${({ $active }) => ($active ? "#f7e9d7" : "transparent")};
  color: ${({ $active }) => ($active ? "#6a380f" : "white")};
  font-weight: ${({ $active }) => ($active ? "bold" : "normal")};
  cursor: pointer;
  transition: all 0.5s ease;
  border-radius: 25px;
  margin: 0.3rem auto;

  &:hover {
    background-color: ${({ $active }) => ($active ? "#f7e9d7" : "rgba(255,255,255,0.1)")};
  }

  .icon {
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 24px;
  }

  .label {
    display: ${({ $expanded }) => ($expanded ? "inline" : "none")};
    white-space: nowrap;
  }
`;
