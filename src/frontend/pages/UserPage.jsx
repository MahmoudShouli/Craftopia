import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/dashboard/Dashboard";
import { toast } from "react-toastify";
import UserProfileCard from "../components/userprofile/userprofilecard/UserProfileCard";
import UserProfileHeader from "../components/userprofile/userheader/UserProfileHeader";
import Search from "../components/userprofile/search/Search";
import UserSchedulesPage from "../components/appointments/schedules/UserSchedulesPage";
import ChatBox from "../components/chat/ChatBox";
import Workshop from "../components/workshop/Workshop";
import UserOrders from "../components/orders/UserOrders";
import {
  PageWrapper,
  ProfileContainer,
} from "../styles/UserProfilePage.styled";
import UserTemplates from "../components/Templates/UserTemplates";

const UserPage = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);

  const [activeView, setActiveView] = useState("profile");
  const [selectedIndex, setSelectedIndex] = useState(1); // sidebar highlight
  const [crafterForSchedule, setCrafterForSchedule] = useState(null);
  const [userForChat, setUserForChat] = useState(null);


  const fileInputRef = useRef();

  useEffect(() => {
    if (user && user.name) {
      setEditedName(user.name);
      setNewPassword("");
      setPreviewUrl(user.avatarUrl || "");
      setLocation(user.location || "");
    }
  }, [user]);

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/user/update-profile/${user._id}`,
        {
          name: editedName,
          location,
          password: newPassword,
        }
      );

      const updatedUser = res.data.user;
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));

      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
      toast.error("Failed to update profile.");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);

    try {
      const res = await axios.post(
        "http://localhost:3000/user/uploadAvatar",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const url = res.data.avatarUrl;
      const updatedUser = { ...user, avatarUrl: url };
      setPreviewUrl(url);
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      toast.success("Avatar uploaded!");
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Failed to update profile.");
    } finally {
      setUploading(false);
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleViewChange = (view) => {

    // Clear crafterForChat if leaving the chat view
    if (activeView === "Chatting" && view !== "Chatting") {
      setUserForChat(null);
    }

    setActiveView(view);

    switch (view) {
      case "profile":
        setSelectedIndex(1);
        break;
      case "search":
        setSelectedIndex(2);
        break;
      case "Schedules":
        setSelectedIndex(4);
        break;
      case "templates":
        setSelectedIndex(3);
        break;
      case "Chatting":
        setSelectedIndex(5);
        break;
      case "Workshop":
        setSelectedIndex(6);
        break;
      case "Orders":
        setSelectedIndex(7);
        break;
      default:
        setSelectedIndex(1);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <PageWrapper>
      <Dashboard selectedIndex={selectedIndex} onItemSelect={handleViewChange} />
      <ProfileContainer>
        <UserProfileHeader user={user} formattedDate={formattedDate} redirect={handleViewChange} />

        {activeView === "profile" && (
          <UserProfileCard
            user={user}
            fileInputRef={fileInputRef}
            handleImageUpload={handleImageUpload}
            previewUrl={previewUrl}
            uploading={uploading}
            isEditing={isEditing}
            handleEditToggle={handleEditToggle}
            handleSave={handleSave}
            editedName={editedName}
            setEditedName={setEditedName}
            location={location}
            setLocation={setLocation}
            newPassword={newPassword}
            setNewPassword={setNewPassword}
          />
        )}

        {activeView === "search" && (
          <Search
            onViewChange={handleViewChange}
            setSelectedCrafter={setCrafterForSchedule}
          />
        )}

        {activeView === "Schedules" && crafterForSchedule && (
          <UserSchedulesPage
            crafter={crafterForSchedule}
            setUserForChat={(crafter) => {
              setActiveView("Chatting");
              setSelectedIndex(5);
              setUserForChat(crafter);
            }}
            setView={setActiveView}
          />
        )}


        {activeView === "templates" && <UserTemplates />}

        {activeView === "Chatting" && (
          <ChatBox userToChatWith={userForChat} />
        )}

        {activeView === "Workshop" && <Workshop />}
        {activeView === "Orders" && <UserOrders />}

      </ProfileContainer>
    </PageWrapper>
  );
};

export default UserPage;
