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
  NotificationBadge
} from "./UserProfileHeader.styled";
import { socket } from "../../../../utils/socket";

const UserProfileHeader = ({ user, formattedDate }) => {
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);


  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await notificationService.fetchNotifications(user.email);
        setNotifications(data);
        const count = data.filter((n) => !n.isRead).length;
        setUnreadCount(count);
      } catch (err) {
        //
      }
    };

    loadNotifications();
  });

  useEffect(() => {
    socket.on("receive_notification", (notification) => {
      setNotifications((prev) => [...prev, notification]);
    });

    return () => {
      socket.off("receive_notification");
    };
  });




  return (
    <HeaderSection>
      <HeaderLeft>
        <WelcomeText>Welcome, {user.name}</WelcomeText>
        <DateText>{formattedDate}</DateText>
      </HeaderLeft>

      <HeaderRight>
      
        <IconWrapper
          onClick={() => setShowNotifications(!showNotifications)}
          style={{ position: "relative", cursor: "pointer" }}
        >
          <Icon>🔔</Icon>

          {unreadCount > 0 && (
            <NotificationBadge>{unreadCount}</NotificationBadge>
          )}

          {showNotifications && (
            <NotificationMenu 
              notifications={notifications} 
              setNotifications={setNotifications}
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
