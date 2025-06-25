// components/UserAvatar.jsx
import React from "react";

const UserAvatar = ({ previewUrl, uploading, user, width = 100, height = 100, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{
        width,
        height,
        borderRadius: "50%",
        backgroundColor: "#f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.2rem",
        color: "#6a380f",
        cursor: "pointer",
        overflow: "hidden",
      }}
    >
      {uploading ? (
        <span style={{ fontSize: "0.9rem" }}>Uploading...</span>
      ) : previewUrl ? (
        <img
          src={previewUrl}
          alt="avatar"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      ) : (
        user?.name?.charAt(0)?.toUpperCase() || "?"
      )}
    </div>
  );
};

export default UserAvatar;
