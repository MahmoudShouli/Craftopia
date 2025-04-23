import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lightLogo from "../../assets/light-logo.png";
import { useUser } from "../../context/UserContext"; 
import {
  Sidebar,
  LogoWrapper,
  LogoImage,
  SidebarItem
} from "./Dashboard.styled";

// Sidebar items
const sidebarItems = [
  { icon: "🏠", label: "Home", route: "/" },
  { icon: "👤", label: "Profile", route: "/userprofile" },
  { icon: "🔎", label: "Search & filter" },  
  { icon: "📅", label: "Schedules" },
  { icon: "📄", label: "Chatting" },
  { icon: "🚪", label: "Logout", route: "/" },
];

const Dashboard = ({ selectedIndex, onItemSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { setUser } = useUser();

  const handleItemClick = (index) => {
    const item = sidebarItems[index];

    if (item.label === "Logout") {
      localStorage.removeItem("user");
      setUser(null);
      navigate("/");
    } else if (item.label === "Search & filter") {
      onItemSelect?.("search");
    } else if (item.label === "Profile") {
      onItemSelect?.("profile");
      if (item.route) navigate(item.route);
    } else if (item.label === "Schedules") {
      onItemSelect?.("Schedules");
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
