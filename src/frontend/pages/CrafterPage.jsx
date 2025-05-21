/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/dashboard/Dashboard";
import { toast } from "react-toastify";
import UserProfileCard from "../components/userprofile/userprofilecard/UserProfileCard";
import UserProfileHeader from "../components/userprofile/userheader/UserProfileHeader";
import CrafterSchedulesPage from "../components/appointments/schedules/Crafter/CrafterSchedulesPage";
import CrafterTemplates from "../components/Templates/CrafterTemplates";
import ChatBox from "../components/chat/ChatBox";
import Workshop from "../components/workshop/Workshop";

import {
  PageWrapper,
  ProfileContainer,
} from "../styles/UserProfilePage.styled";

const CrafterPage = () => {
  const { user, setUser } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [location, setLocation] = useState("");
  const [uploading, setUploading] = useState(false);
  const [activeView, setActiveView] = useState("profile");
  const [selectedIndex, setSelectedIndex] = useState(1);
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
    setActiveView(view);
    switch (view) {
      case "profile":
        setSelectedIndex(1);
        break;
      case "Schedules":
        setSelectedIndex(2);
        break;
      case "templates":
        setSelectedIndex(3);
        break;
      case "Chatting":
        setSelectedIndex(4);
        break;
      case "Workshop":
        setSelectedIndex(5);
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
            user={user}/>
        )}

        {activeView === "Schedules" && <CrafterSchedulesPage />}
        {activeView === "templates" && <CrafterTemplates />}
        {activeView === "Chatting" && (
          <ChatBox/>
        )}
        {activeView === "Workshop" && (
          <Workshop/>
        )}
      </ProfileContainer>
    </PageWrapper>
  );
};

export default CrafterPage;
