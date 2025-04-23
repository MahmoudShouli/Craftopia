import React from "react";
import {
  CardContainer,
  CrafterName,
  CrafterCraft,
  ContactButton,
} from "./UserCard.styled";
import UserAvatar from "../useravatar/UserAvatar";

const UserCard = ({ avatarUrl, name, craft, rating = 0, uploading = false, onContact }) => {
  const user = { name };

  return (
    <CardContainer>
      <UserAvatar
        previewUrl={avatarUrl}
        uploading={uploading}
        user={user}
        width={80}
        height={80}
      />
      <CrafterName>{name}</CrafterName>
      <CrafterCraft>{craft}</CrafterCraft>

      <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
        ⭐ {rating.toFixed(1)} / 5
      </p>

      <ContactButton onClick={onContact}>Contact</ContactButton>
    </CardContainer>
  );
};

export default UserCard;
