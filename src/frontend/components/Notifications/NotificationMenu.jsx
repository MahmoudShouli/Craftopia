import React, { useState, useRef } from "react";
import {
  NotificationPopup,
  NotificationItem,
  NoNotification,
  NotificationContent,
  NotificationRow,
} from "./NotificationMenu.styled";

const NotificationMenu = ({ notifications, readIds, setReadIds }) => {
  const longPressTimeout = useRef();
  const wasLongPressed = useRef(false);

  const handleMarkAsRead = (id) => {
    if (!readIds.includes(id)) {
      setReadIds((prev) => [...prev, id]);
    }
  };

  const handleMarkAsUnread = (id) => {
    setReadIds((prev) => prev.filter((readId) => readId !== id));
  };

  const isRead = (id) => readIds.includes(id);

  const handleMouseDown = (id) => {
    wasLongPressed.current = false;
    longPressTimeout.current = setTimeout(() => {
      handleMarkAsUnread(id);
      wasLongPressed.current = true;
    }, 800);
  };

  const handleClick = (id) => {
    if (!wasLongPressed.current) {
      handleMarkAsRead(id);
    }
  };

  const cancelLongPress = () => {
    clearTimeout(longPressTimeout.current);
  };

  return (
    <NotificationPopup onClick={(e) => e.stopPropagation()}>
      {notifications.length > 0 ? (
        notifications.map((note) => (
          <NotificationItem
            key={note.id}
            $read={isRead(note.id)}
            onClick={() => handleClick(note.id)}
            onMouseDown={() => handleMouseDown(note.id)}
            onMouseUp={cancelLongPress}
            onMouseLeave={cancelLongPress}
          >
            <NotificationRow>
              <NotificationContent>{note.message}</NotificationContent>
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
