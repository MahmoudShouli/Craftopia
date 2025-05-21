import React, { useState, useEffect } from "react";
import { CiSearch } from "react-icons/ci";
import UserAvatar from "../../useravatar/UserAvatar";
import NotificationMenu from "../../Notifications/NotificationMenu"; 
import notificationService from "../../../api/notificationService";
import { toast } from "react-toastify";
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
} from "./UserProfileHeader.styled";

const UserProfileHeader = ({ user, formattedDate }) => {
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false);
  const [readIds, setReadIds] = useState([]);

  useEffect(() => {
  const loadNotifications = async () => {
    try {
      const data = await notificationService.fetchNotifications(user.email);
      setNotifications(data);
    } catch (err) {
      toast.error("Failed to load notifications");
    }
  };

  loadNotifications();
}, []);

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
