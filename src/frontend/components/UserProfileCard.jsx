// components/UserProfileCard.jsx
import React, { useState } from 'react';
import UserAvatar from "./UserAvatar";
import { FaUser, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { RiLockPasswordLine } from "react-icons/ri";
import MapPopup from '../components/MapPopup';
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
} from "../styles/UserProfilePage.styled";

const UserProfileCard = ({
  user,
  fileInputRef,
  handleImageUpload,
  previewUrl,
  uploading,
  isEditing,
  handleEditToggle,
  handleSave,
  editedName,
  setEditedName,
  location,
  setLocation,
  newPassword,
  setNewPassword
}) => {

  const [city, setCity] = useState('');
  const [showMap, setShowMap] = useState(false);

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
            width={120}
            height={120}
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
              name="location"
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
