import React, { useState, useRef } from "react";
import notificationService from "../../api/notificationService";
import {
  NotificationPopup,
  NotificationItem,
  NoNotification,
  NotificationContent,
  NotificationRow,
} from "./NotificationMenu.styled";

const NotificationMenu = ({ notifications, setNotifications}) => {
 
  const handleClick = async (note) => {
    if (!note.isRead){
      const updated = await notificationService.markNotificationAsRead(note._id);
      setNotifications((prev) =>
        prev.map((n) => (n._id === updated._id ? updated : n))
      );
    }
  }
  

  return (
    <NotificationPopup onClick={(e) => e.stopPropagation()}>
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <NotificationItem
            key={note.id}
            $read={note.isRead}
            onClick={() => handleClick(note)}
      
          >
            <NotificationRow>
              <NotificationContent>{note.text}</NotificationContent>
            </NotificationRow>
          </NotificationItem>
        ))
      ) : (
        <NoNotification>No notifications</NoNotification>
      )}
    </NotificationPopup>
  );
};

export default NotificationMenu;
