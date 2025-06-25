import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import html2canvas from "html2canvas";
import StatCard from "./StatCard";
import { FaChartBar, FaClipboardList, FaBoxOpen, FaUserPlus } from "react-icons/fa";

// Flash animation keyframes
const flash = keyframes`
  0% { opacity: 0; }
  10% { opacity: 1; }
  100% { opacity: 0; }
`;

// Overlay flash style
const FlashOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: white;
  animation: ${flash} 0.4s ease;
  z-index: 9999;
  pointer-events: none;
`;

const Box = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 100%;
  height: 360px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.h3`
  font-size: 1.4rem;
  font-weight: 600;
  color: #333;
`;

const Subtext = styled.p`
  font-size: 0.9rem;
  color: #888;
`;

const CardsRow = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: nowrap;
  padding-bottom: 0.5rem;
`;

const StatsBox = () => {
  const [showFlash, setShowFlash] = useState(false);

  const handleExport = async () => {
    setShowFlash(true);
    setTimeout(() => setShowFlash(false), 400);

    // Capture the whole page
    const canvas = await html2canvas(document.body);
    const dataURL = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "full-page-screenshot.png";
    link.click();
  };

  return (
    <>
      {showFlash && <FlashOverlay />}
      <Box>
        <Header>
          <button
            style={{
              background: "#f7f7f7",
              border: "1px solid #ccc",
              padding: "0.5rem 1rem",
              borderRadius: "8px",
              cursor: "pointer",
              position: "relative",
              left: "900px",
            }}
            onClick={handleExport}
          >
            ⬇ Export
          </button>
        </Header>

        <CardsRow>
          <StatCard
            icon={<FaChartBar color="#f75555" />}
            value="$1k"
            label="Total Sales"
            change="+8% from yesterday"
            bg="#ffe3e3"
            positive
          />
          <StatCard
            icon={<FaClipboardList color="#ff944d" />}
            value="300"
            label="Total Orders"
            change="+5% from yesterday"
            bg="#fff2cc"
            positive
          />
          <StatCard
            icon={<FaBoxOpen color="#3dbb6b" />}
            value="5"
            label="Product Sold"
            change="+12% from yesterday"
            bg="#e2fbe9"
            positive
          />
          <StatCard
            icon={<FaUserPlus color="#a770ef" />}
            value="8"
            label="New Customers"
            change="0.5% from yesterday"
            bg="#e6e1fa"
            positive
          />
        </CardsRow>
      </Box>
    </>
  );
};

export default StatsBox;
