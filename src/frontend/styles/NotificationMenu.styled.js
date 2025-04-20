// styles/Notification.styled.js
import styled from "styled-components";

export const NotificationPopup = styled.div`
  position: absolute;
  top: 3.5rem;
  right: 0; /* keep this since the bell icon is at the right edge */
  transform: translateX(35%); /* nudge slightly away from edge */
  background-color: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  min-width: 250px;
  max-height: 300px;
  overflow-y: auto;
  z-index: 100;
  padding: 0.75rem;
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
`;

export const NoNotification = styled.div`
  padding: 0.75rem;
  font-size: 0.95rem;
  color: #666;
  text-align: center;
`;

export const MarkAsReadButton = styled.button`
  margin-top: 0.5rem;
  background-color: #eaeaea;
  border: none;
  border-radius: 0.5rem;
  padding: 0.3rem 0.6rem;
  font-size: 0.8rem;
  cursor: pointer;
  color: #333;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ddd;
  }
`;

export const NotificationItem = styled.div`
  background-color: ${({ $read }) => ($read ? "#e0dbdb" : "white")};
  border-radius: 0.75rem;
  padding: 0.75rem 1rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: background-color 0.2s ease;
  cursor: pointer;

  &:hover {
    background-color: ${({ $read }) => ($read ? "#ececec" : "#f9f9f9")};
  }
`;

export const NotificationRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
`;

export const NotificationContent = styled.div`
  flex: 1;
  font-size: 0.95rem;
  color: #333;
`;
