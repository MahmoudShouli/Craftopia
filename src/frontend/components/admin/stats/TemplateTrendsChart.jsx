import React from "react";
import styled from "styled-components";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ChartWrapper = styled.div`
  width: 100%;
  height: 360px;
  background: white;
  border-radius: 16px;
  padding: 1.2rem 1.5rem 1rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  font-weight: 600;
  color: #1d1d1d;
  margin-bottom: 0.5rem;
`;

const LegendBox = styled.div`
  margin-top: 0.5rem;
  padding: 6px 12px;
  border-radius: 10px;
  background-color: #f7f7f7;
  display: flex;
  justify-content: center;
  gap: 18px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.9rem;
`;

const ColorDot = styled.span`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: ${(props) => props.color || "gray"};
`;

const data = [
  { month: "Jan", views: 420, likes: 90, orders: 30 },
  { month: "Feb", views: 510, likes: 120, orders: 40 },
  { month: "Mar", views: 460, likes: 110, orders: 38 },
  { month: "Apr", views: 590, likes: 150, orders: 55 },
  { month: "May", views: 650, likes: 200, orders: 60 },
  { month: "Jun", views: 700, likes: 220, orders: 80 },
  { month: "Jul", views: 900, likes: 300, orders: 110 },
  { month: "Aug", views: 870, likes: 280, orders: 100 },
  { month: "Sep", views: 820, likes: 260, orders: 95 },
  { month: "Oct", views: 760, likes: 230, orders: 85 },
  { month: "Nov", views: 720, likes: 210, orders: 70 },
  { month: "Dec", views: 800, likes: 250, orders: 90 },
];

const TemplateTrendsChart = () => (
  <ChartWrapper>
    <Title>📈 Template Interactions Over Time</Title>

    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="views" stroke="#6a5acd" strokeWidth={2} name="Views" />
        <Line type="monotone" dataKey="likes" stroke="#ff69b4" strokeWidth={2} name="Likes" />
        <Line type="monotone" dataKey="orders" stroke="#28a745" strokeWidth={2} name="Orders" />
      </LineChart>
    </ResponsiveContainer>

    <LegendBox>
      <LegendItem>
        <ColorDot color="#6a5acd" />
        Views
      </LegendItem>
      <LegendItem>
        <ColorDot color="#ff69b4" />
        Likes
      </LegendItem>
      <LegendItem>
        <ColorDot color="#28a745" />
        Orders
      </LegendItem>
    </LegendBox>
  </ChartWrapper>
);

export default TemplateTrendsChart;
