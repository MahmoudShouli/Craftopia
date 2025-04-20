import {
    NotificationPopup,
    NotificationItem,
    NoNotification,
    NotificationContent,
    NotificationRow,
  } from "../styles/NotificationMenu.styled";

import React, { useState, useRef } from "react";


const NotificationMenu = ({ notifications, readIds, setReadIds }) => {
  const longPressTimeout = useRef();

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
    longPressTimeout.current = setTimeout(() => {
      handleMarkAsUnread(id);
    }, 500);
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
            onClick={() => handleMarkAsRead(note.id)}
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
