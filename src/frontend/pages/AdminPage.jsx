import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/dashboard/Dashboard";
import AdminDashboard from "../components/admin/AdminDashboard";
import UserProfileHeader from "../components/userprofile/userheader/UserProfileHeader";

import { PageWrapper, ProfileContainer } from "../styles/UserProfilePage.styled";

const AdminPage = () => {
  const { user, setUser } = useUser();
  const navigate = useNavigate();

  const [activeView, setActiveView] = useState("dashboard");
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user]);

  const handleViewChange = (view) => {
    setActiveView(view);

    switch (view) {
      case "dashboard":
        setSelectedIndex(0);
        break;
      case "users":
        setSelectedIndex(1);
        break;
      case "orders":
        setSelectedIndex(2);
        break;
      case "templates":
        setSelectedIndex(3);
        break;
      case "appointments":
        setSelectedIndex(4);
        break;
      default:
        setSelectedIndex(0);
    }
  };

  if (!user) return <div>Loading admin page...</div>;

  return (
    <PageWrapper>
      <Dashboard selectedIndex={selectedIndex} onItemSelect={handleViewChange} />
      <ProfileContainer>
        <UserProfileHeader
            user={user}
            formattedDate={new Date().toLocaleDateString("en-GB", {
            weekday: "short",
            day: "2-digit",
            month: "long",
            year: "numeric",
            })}
            redirect={handleViewChange}
        />

        {activeView === "dashboard" && <AdminDashboard />}
        {activeView === "users" && <div>users View (coming soon)</div>}
        {activeView === "orders" && <div>orders View (coming soon)</div>}
        {activeView === "templates" && <div>Templates View (coming soon)</div>}
        {activeView === "appointments" && <div>Appointments View (coming soon)</div>}
        </ProfileContainer>
    </PageWrapper>
  );
};

export default AdminPage;
