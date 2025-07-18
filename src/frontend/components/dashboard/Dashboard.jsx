import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import lightLogo from "../../assets/light-logo.png";
import { useUser } from "../../context/UserContext";
import { io } from "socket.io-client";
import {
  Sidebar,
  LogoWrapper,
  LogoImage,
  SidebarItem
} from "./Dashboard.styled";

const socket = io.connect("http://localhost:3000");

// Sidebar items for customers
const customerSidebarItems = [
  { icon: "🏠", label: "Home", route: "/" },
  { icon: "👤", label: "Profile", route: "/userprofile" },
  { icon: "🔎", label: "Search & filter" },
  { icon: "🛠️", label: "Templates" },
  { icon: "📅", label: "Schedules" },
  { icon: "💬", label: "Chatting" },
  { icon: "🏭", label: "Workshop" },
  { icon: "🛒", label: "Orders" },
  { icon: "↪", label: "Logout", route: "/" },
];

// Sidebar items for crafters
const crafterSidebarItems = [
  { icon: "🏠", label: "Home", route: "/" },
  { icon: "👤", label: "Profile", route: "/userprofile" },
  { icon: "📅", label: "Schedules" },
  { icon: "🛠️", label: "Templates" },
  { icon: "💬", label: "Chatting" },
  { icon: "🏭", label: "Workshop" },
  { icon: "🛒", label: "Orders" },
  { icon: "↪", label: "Logout", route: "/" },
];

// ✅ Sidebar items for admin
const adminSidebarItems = [
  { icon: "📊", label: "Dashboard" },
  { icon: "👥", label: "Users" },
  { icon: "📦", label: "Orders" },
  { icon: "🛠️", label: "Templates" },
  { icon: "⭐️", label: "Reviews" },
  { icon: "🚪", label: "Logout", route: "/" },
];

const Dashboard = ({ selectedIndex, onItemSelect }) => {
  const [isHovered, setIsHovered] = useState(false);
  const navigate = useNavigate();
  const { user, setUser } = useUser();

  // Pick list based on user role
  let sidebarItems = customerSidebarItems;
  if (user?.role === "crafter") {
    sidebarItems = crafterSidebarItems;
  } else if (user?.role === "admin") {
    sidebarItems = adminSidebarItems;
  }

  const handleItemClick = (index) => {
    const item = sidebarItems[index];

    setTimeout(() => {
      if (item.label === "Logout") {
        socket.emit("user_offline", user.email);
        sessionStorage.removeItem("user");
        setUser(null);
        navigate("/");
      } else if (user?.role === "admin") {
        onItemSelect?.(item.label.toLowerCase()); // 'dashboard', 'users', etc.
      } else {
        if (item.label === "Search & filter") onItemSelect?.("search");
        else if (item.label === "Profile") onItemSelect?.("profile");
        else if (item.label === "Schedules") onItemSelect?.("Schedules");
        else if (item.label === "Templates") onItemSelect?.("templates");
        else if (item.label === "Chatting") onItemSelect?.("Chatting");
        else if (item.label === "Workshop") onItemSelect?.("Workshop");
        else if (item.label === "Orders") onItemSelect?.("Orders");
        else if (item.route) navigate(item.route);
      }
    }, 0);
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
