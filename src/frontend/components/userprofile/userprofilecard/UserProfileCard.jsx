// components/UserProfileCard.jsx
import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useUser } from "../../../context/UserContext";
import { toast } from "react-toastify";
import UserAvatar from "../../useravatar/UserAvatar";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import MapPopup from '../../map/MapPopup';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'leaflet/dist/leaflet.css';
import {
  UserCard,
  UserHeader,
  UserDetails,
  Name,
  Email,
  EditButton,
  SaveButton,
  FormGrid,
  Field,
  Label,
  InputWrapper,
  Input
} from "./UserProfileCard.styled";

const UserProfileCard = ({ user }) => {

  const { setUser } = useUser();

  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || '');
  const [newPassword, setNewPassword] = useState('');
  const [previewUrl, setPreviewUrl] = useState(user?.avatarUrl || '');
  const [location, setLocation] = useState(user?.location || '');
  const [city, setCity] = useState(user?.location.coordinates || '');
  const [uploading, setUploading] = useState(false);
  const [showMap, setShowMap] = useState(false);


  const fileInputRef = useRef();

  const handleEditToggle = () => setIsEditing(!isEditing);

  const handleSave = async () => {
    try {
      const res = await axios.put(
        `http://localhost:3000/user/update-profile/${user._id}`,
        {
          name: editedName,
          location: city,
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
      toast.error("Failed to upload avatar.");
    } finally {
      setUploading(false);
    }
  };

  
  return (
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
          <UserAvatar
            previewUrl={previewUrl}
            uploading={uploading}
            user={user}
            width={200}
            height={200}
            onClick={() => fileInputRef.current.click()}
          />
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

        <Field>
          <Label>Location</Label>
          <InputWrapper>
            <FaMapMarkerAlt className="input-icon" onClick={() => setShowMap(true)} style={{ cursor: "pointer" }} />
            <Input
              type="text"
              placeholder="Address"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              disabled={!isEditing}
            />
          </InputWrapper>
        </Field>
      </FormGrid>

      {showMap && (
        <MapPopup
          onClose={() => setShowMap(false)}
          onSelectCoordinates={(locationString) => setLocation(locationString)}
          onSelectCity={(locationString) => setCity(locationString)}
        />
      )}
    </UserCard>
  );
};

export default UserProfileCard;
