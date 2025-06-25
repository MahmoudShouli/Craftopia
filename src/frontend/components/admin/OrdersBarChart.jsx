import React from "react";
import styled from "styled-components";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
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

// Dummy monthly data for paid vs unpaid orders
const data = [
  { month: "Jan", paid: 120, unpaid: 40 },
  { month: "Feb", paid: 150, unpaid: 50 },
  { month: "Mar", paid: 100, unpaid: 30 },
  { month: "Apr", paid: 170, unpaid: 60 },
  { month: "May", paid: 200, unpaid: 70 },
  { month: "Jun", paid: 180, unpaid: 65 },
  { month: "Jul", paid: 220, unpaid: 80 },
  { month: "Aug", paid: 210, unpaid: 90 },
  { month: "Sep", paid: 190, unpaid: 60 },
  { month: "Oct", paid: 200, unpaid: 70 },
  { month: "Nov", paid: 230, unpaid: 100 },
  { month: "Dec", paid: 250, unpaid: 110 },
];

const OrdersBarChart = () => (
  <ChartWrapper>
    <Title>Monthly Orders (Paid vs Unpaid)</Title>

    <ResponsiveContainer width="100%" height={250}>
      <BarChart data={data} barGap={8}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="paid" fill="#0088FE" name="Paid Orders" radius={[4, 4, 0, 0]} />
        <Bar dataKey="unpaid" fill="#00C49F" name="Unpaid Orders" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  </ChartWrapper>
);

export default OrdersBarChart;
