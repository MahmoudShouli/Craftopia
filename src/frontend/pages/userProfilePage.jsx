import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/Dashboard";
import { CiSearch } from "react-icons/ci";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import {
  PageWrapper,
  ProfileContainer,
  HeaderSection,
  HeaderLeft,
  WelcomeText,
  DateText,
  HeaderRight,
  SearchBarWrapper,
  SearchInput,
  IconWrapper,
  Icon,
  UserCard,
  UserHeader,
  Avatar,
  UserDetails,
  Name,
  Email,
  FormGrid,
  Field,
  Label,
  InputWrapper,
  Input,
  EditButton,
  SaveButton
} from '../styles/UserProfilePage.styled';

const UserProfilePage = () => {
  const { user , setUser  } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const [location, setLocation] = useState("");
  const fileInputRef = useRef();
  const [uploading, setUploading] = useState(false);

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
        `http://localhost:3000/api/user/update-profile/${user._id}`,
        {
          name: editedName,
          location,
          password: newPassword,
        }
      );
  
      const updatedUser = res.data.user; // ✅ direct, not nested
  
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser)); // ✅ flat value now
  
      console.log("Saved user to localStorage:", updatedUser);
      console.log("New localStorage value:", localStorage.getItem("user"));
  
      setIsEditing(false);
    } catch (err) {
      console.error("Error saving profile:", err);
    }
  };

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    setUploading(true);
    const formData = new FormData();
    formData.append("avatar", file);
    formData.append("userId", user._id);
  
    try {
      const res = await axios.post("http://localhost:3000/api/user/uploadAvatar", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      const url = res.data.avatarUrl;
  
      // ✅ Update preview
      setPreviewUrl(url);
  
      // ✅ Create updated user object
      const updatedUser = {
        ...user,
        avatarUrl: url,
      };
  
      // ✅ Sync with context and localStorage
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
  
      console.log("Avatar uploaded and synced:", updatedUser);
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  if (!user) return <div>Loading profile...</div>;

  return (
    <PageWrapper>
      <Dashboard />

      <ProfileContainer>
        <HeaderSection>
          <HeaderLeft>
            <WelcomeText>Welcome, {user.name}</WelcomeText>
            <DateText>{formattedDate}</DateText>
          </HeaderLeft>

          <HeaderRight>
            <SearchBarWrapper>
              <CiSearch className="icon" />
              <SearchInput type="text" placeholder="Search" />
            </SearchBarWrapper>
            <IconWrapper>
              <Icon>🔔</Icon>
            </IconWrapper>
            <IconWrapper style={{ padding: 0 }}>
              {user?.avatarUrl ? (
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <Icon
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                    color: "#6a380f",
                  }}
                >
                  {user?.name?.charAt(0)?.toUpperCase() || "?"}
                </Icon>
              )}
            </IconWrapper>
          </HeaderRight>
        </HeaderSection>

        <UserCard>
          <UserHeader>
            <>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleImageUpload}
                style={{ display: "none" }}
              />

              <Avatar onClick={() => fileInputRef.current.click()}>
                {uploading ? (
                  <span style={{ fontSize: "0.9rem" }}>Uploading...</span>
                ) : previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                      height: "100%,",
                      borderRadius: "50%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  user?.name?.charAt(0)?.toUpperCase() || "?"
                )}
              </Avatar>
            </>
            <UserDetails>
              <Name>{user.name}</Name>
              <Email>{user.email}</Email>
            </UserDetails>
            {!isEditing ? (
              <EditButton onClick={handleEditToggle}>Edit</EditButton>
            ) : (
              <SaveButton onClick={handleSave}>Save</SaveButton>
            )}
          </UserHeader>

          <FormGrid>
            <Field>
              <Label>Name</Label>
              <InputWrapper>
                <FaUser className="input-icon" />
                <Input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  disabled={!isEditing}
                />
              </InputWrapper>
            </Field>

            <Field>
              <Label>Location</Label>
              <InputWrapper>
                <FaMapMarkerAlt className="input-icon" />
                <Input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  disabled={!isEditing}
                />
              </InputWrapper>
            </Field>

            <Field>
              <Label>Email</Label>
              <InputWrapper>
                <MdEmail className="input-icon" />
                <Input
                  type="email"
                  value={user.email}
                  disabled
                />
              </InputWrapper>
            </Field>

            <Field>
              <Label>Password</Label>
              <InputWrapper>
                <RiLockPasswordLine className="input-icon" />
                <Input
                  type="password"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={!isEditing}
                />
              </InputWrapper>
            </Field>
          </FormGrid>
        </UserCard>
      </ProfileContainer>
    </PageWrapper>
  );
};

export default UserProfilePage;