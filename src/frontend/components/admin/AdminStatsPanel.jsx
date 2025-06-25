import React from "react";
import StatCard from "./StatCard";
import styled from "styled-components";
import { FaChartBar, FaClipboardList, FaBoxOpen, FaUserPlus } from "react-icons/fa";

const StatsContainer = styled.div`
  display: flex;
  gap: 1.5rem;
  flex-wrap: wrap;
`;

const AdminStatsPanel = ({ stats }) => {
  if (!stats) return <p>Loading stats...</p>;

  return (
    <StatsContainer>
      <StatCard
        icon={<FaChartBar color="#f75555" />}
        value="$1k"
        label="Total Sales"
        change="+8% from yesterday"
        bg="#ffe3e3"
        positive={true}
      />
      <StatCard
        icon={<FaClipboardList color="#ff944d" />}
        value="300"
        label="Total Orders"
        change="+5% from yesterday"
        bg="#fff2cc"
        positive={true}
      />
      <StatCard
        icon={<FaBoxOpen color="#3dbb6b" />}
        value="5"
        label="Product Sold"
        change="+12% from yesterday"
        bg="#e2fbe9"
        positive={true}
      />
      <StatCard
        icon={<FaUserPlus color="#a770ef" />}
        value="8"
        label="New Customers"
        change="0.5% from yesterday"
        bg="#e6e1fa"
        positive={true}
      />
    </StatsContainer>
  );
};

export default AdminStatsPanel;
