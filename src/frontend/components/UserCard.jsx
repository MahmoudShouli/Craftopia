import React from "react";
import {
  CardContainer,
  CrafterName,
  CrafterCraft,
  ContactButton,
} from "../styles/UserCard.styled";
import UserAvatar from "./UserAvatar";

const UserCard = ({ avatarUrl, name, craft, uploading = false }) => {
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
      <ContactButton>Contact</ContactButton>
    </CardContainer>
  );
};

export default UserCard;
