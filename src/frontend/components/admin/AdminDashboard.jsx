import React from "react";
import UsersByRoleAreaChart from "./UsersByRoleAreaChart";
import OrdersBarChart from "./OrdersBarChart";
import TemplateCategoryPieChart from "./TemplateCategoryPieChart";
import StatsOverview from "./stats/StatsOverview";
import styled from "styled-components";

export const AdminCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 790px;
  overflow-y: hidden;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;
`;

const ChartRow = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 24px;
  width: 100%;
`;

const ChartBox = styled.div`
  flex: 1;
  background: white;
  border-radius: 16px;
  padding: 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
`;

const AdminDashboard = () => {
  return (
    <AdminCard>
      <StatsOverview />
      <ChartRow>
        <ChartBox><UsersByRoleAreaChart /></ChartBox>
        <ChartBox><TemplateCategoryPieChart /></ChartBox>
        <ChartBox><OrdersBarChart /></ChartBox>
      </ChartRow>
    </AdminCard>
  );
};

export default AdminDashboard;
