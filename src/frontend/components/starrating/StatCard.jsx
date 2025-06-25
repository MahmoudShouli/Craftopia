import React from "react";

const StatCard = ({ icon, count, bgColor }) => {
  return (
    <div
      style={{
        backgroundColor: bgColor,
        color: "#fff",
        padding: "1rem 1.5rem",
        borderRadius: "16px",
        boxShadow: "0 2px 6px rgba(0, 0, 0, 0.15)",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        minWidth: "120px",
        minHeight: "100px",
        fontFamily: "inherit",
        gap: 10
      }}
    >
      <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>{icon}</div>
      <div style={{ fontSize: "1.8rem", fontWeight: "bold" }}>{count}</div>
    </div>
  );
};

export default StatCard;
