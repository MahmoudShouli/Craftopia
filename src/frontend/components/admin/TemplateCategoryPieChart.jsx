import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Sector,
} from "recharts";
import styled from "styled-components";

const ChartWrapper = styled.div`
  width: 100%;
  height: 360px;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.25);
`;

const Title = styled.h4`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  color: #1d1d1d;
`;

const COLORS = [
  "#9370DB", "#87CEEB", "#3CB371", "#FFA500",
  "#ADFF2F", "#90EE90", "#FF7F7F", "#FFD700"
];

const data = [
  { name: "Plasterer", value: 10 },
  { name: "Plumber", value: 8 },
  { name: "Electrician", value: 14 },
  { name: "Painter", value: 9 },
  { name: "Tiler", value: 11 },
  { name: "Carpenter", value: 13 },
  { name: "Aluminum and Glass Technician", value: 6 },
  { name: "Cleaner", value: 7 },
];

// Custom shape with scale + outer gap (pop-out effect)
const renderActiveShape = (props) => {
  const {
    cx, cy, innerRadius, outerRadius,
    startAngle, endAngle, fill, midAngle,
  } = props;

  const RADIAN = Math.PI / 180;
  const offset = 10;
  const x = cx + offset * Math.cos(-midAngle * RADIAN);
  const y = cy + offset * Math.sin(-midAngle * RADIAN);

  return (
    <Sector
      cx={x}
      cy={y}
      innerRadius={innerRadius}
      outerRadius={outerRadius + 8} 
      startAngle={startAngle}
      endAngle={endAngle}
      fill={fill}
    />
  );
};

const TemplateCategoryPieChart = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  return (
    <ChartWrapper>
      <Title>📊 Template Category Distribution</Title>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
            activeIndex={activeIndex}
            activeShape={renderActiveShape}
            onMouseEnter={(_, index) => setActiveIndex(index)}
            onMouseLeave={() => setActiveIndex(null)}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default TemplateCategoryPieChart;
