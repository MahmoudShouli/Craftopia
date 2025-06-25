import React from "react";
import {
  CardContainer,
  CrafterName,
  CrafterCraft,
} from "./UserCard.styled";
import UserAvatar from "../useravatar/UserAvatar";
import Button from "../button/Button";

const UserCard = ({ avatarUrl, name, craft, rating = 0, uploading = false, onContact , onView }) => {
  const user = { name };

  return (
    <CardContainer onClick={onView}>
      <UserAvatar
        previewUrl={avatarUrl}
        uploading={uploading}
        user={user}
        width={80}
        height={80}
      />
      <CrafterName>{name}</CrafterName>
      <CrafterCraft>{craft}</CrafterCraft>

      <p style={{ fontSize: '1.2rem'}}>
        ⭐ {rating.toFixed(1)} / 5
      </p>

      <Button
        text="Contact"
        size="medium"
        color="#6a380f"
        onClick={(e) => {
          e.stopPropagation(); 
          onContact();
        }}
      />
    </CardContainer>
  );
};

export default UserCard;