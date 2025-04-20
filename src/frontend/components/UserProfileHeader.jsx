import React, { useState } from "react";
import { CiSearch } from "react-icons/ci";
import UserAvatar from "./UserAvatar";
import NotificationMenu from "./NotificationMenu"; 

import {
  HeaderSection,
  HeaderLeft,
  WelcomeText,
  DateText,
  HeaderRight,
  SearchBarWrapper,
  SearchInput,
  IconWrapper,
  Icon,
} from "../styles/UserProfilePage.styled";

const UserProfileHeader = ({ user, formattedDate }) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [readIds, setReadIds] = useState([]);

  const notifications = [
    { id: 1, message: "New message from admin" },
    { id: 2, message: "New message from admin" },
    { id: 3, message: "New message from admin" },
    { id: 4, message: "New message from admin" },
    { id: 5, message: "New message from admin" },
    { id: 6, message: "New message from admin" },
    
    // empty array = no notifications
  ];

  return (
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

        <IconWrapper
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <Icon>🔔</Icon>
          {showNotifications && (
            <NotificationMenu notifications={notifications} 
              readIds={readIds}
              setReadIds={setReadIds}
            />
          )}
        </IconWrapper>

        <IconWrapper style={{ padding: 0 }}>
          <UserAvatar
            previewUrl={user.avatarUrl}
            uploading={false}
            user={user}
            width={40}
            height={40}
          />
        </IconWrapper>
      </HeaderRight>
    </HeaderSection>
  );
};

export default UserProfileHeader;
