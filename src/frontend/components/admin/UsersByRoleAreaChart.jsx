import React from "react";
import styled from "styled-components";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ChartWrapper = styled.div`
  width: 100%;
  height: 320px;
  background: white;
  border-radius: 16px;
  padding: 1rem 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.1rem;
  color: #1d1d1d;
`;

// Dummy data: replace with real monthly user counts
const data = [
  { month: "Jan", customers: 200, crafters: 120 },
  { month: "Feb", customers: 180, crafters: 150 },
  { month: "Mar", customers: 190, crafters: 140 },
  { month: "Apr", customers: 230, crafters: 160 },
  { month: "May", customers: 250, crafters: 170 },
  { month: "Jun", customers: 240, crafters: 180 },
  { month: "Jul", customers: 260, crafters: 210 },
  { month: "Aug", customers: 270, crafters: 190 },
  { month: "Sep", customers: 230, crafters: 170 },
  { month: "Oct", customers: 250, crafters: 200 },
  { month: "Nov", customers: 270, crafters: 210 },
  { month: "Dec", customers: 300, crafters: 240 },
];

const UsersByRoleAreaChart = () => (
  <ChartWrapper>
    <Title>Users Joined Per Role</Title>

    <ResponsiveContainer width="100%" height={250}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorCustomers" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00c49f" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#00c49f" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorCrafters" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#0088fe" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#0088fe" stopOpacity={0} />
          </linearGradient>
        </defs>

        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Area
          type="monotone"
          dataKey="customers"
          stroke="#00c49f"
          fillOpacity={1}
          fill="url(#colorCustomers)"
          name="Customers"
        />
        <Area
          type="monotone"
          dataKey="crafters"
          stroke="#0088fe"
          fillOpacity={1}
          fill="url(#colorCrafters)"
          name="Crafters"
        />
      </AreaChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

export default UsersByRoleAreaChart;
