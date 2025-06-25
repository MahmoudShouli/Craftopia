import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  VictoryPie,
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { getOrdersByCrafter } from "../../api/orderService";
import { useUser } from "../../context/UserContext";

const Card = styled.div`
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  width: 100%;
  max-height: 700px;
  overflow-y: auto;
`;

const Title = styled.h2`
  margin-bottom: 16px;
  text-align: center;
`;

const StatText = styled.div`
  font-size: 1.2rem;
  font-weight: 500;
  color: #3b1d0f;
  margin-bottom: 8px;
  text-align: center;
`;

const Legend = styled.div`
  display: flex;
  justify-content: center;
  gap: 24px;
  margin-top: -150px;
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorBox = styled.div`
  width: 16px;
  height: 16px;
  background-color: ${({ color }) => color};
  border-radius: 4px;
`;

const CrafterStats = () => {
  const { user } = useUser();
  const [orders, setOrders] = useState([]);
  const [paidCount, setPaidCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [monthlySales, setMonthlySales] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      if (!user?.email) return;

      const data = await getOrdersByCrafter(user.email);
      setOrders(data);

      const paidOrders = data.filter((o) => o.paymentStatus === "paid");
      setPaidCount(paidOrders.length);
      setTotalCount(data.length);

      const earningsByMonth = {};
      paidOrders.forEach((order) => {
        const date = new Date(order.createdAt);
        const key = `${date.getFullYear()}-${(date.getMonth() + 1)
          .toString()
          .padStart(2, "0")}`;
        const price = order.template?.price || 0;
        earningsByMonth[key] = (earningsByMonth[key] || 0) + price;
      });

      const chartData = Object.entries(earningsByMonth).map(([key, total]) => {
        const [year, monthNum] = key.split("-");
        const date = new Date(`${year}-${monthNum}-01`);
        const label = date.toLocaleString("default", { month: "short" }) + ` '${year.slice(-2)}`;
        return {
            date,         // ✅ for sorting
            month: label, // label to show
            total,
        };
        });

        // ✅ Sort by real date
        chartData.sort((a, b) => a.date - b.date);

        setMonthlySales(chartData);
    };

    fetch();
  }, [user?.email]);

  const netTotal = orders
    .filter((o) => o.paymentStatus === "paid")
    .reduce((sum, o) => sum + (o.template?.price || 0), 0);

  return (
    <Card>
      <Title>Your Stats</Title>
      <StatText>Total Net: ${netTotal.toFixed(2)}</StatText>
      <StatText style={{ marginBottom: "-120px" }}>Total Orders: {totalCount}</StatText>


      {/* Pie Chart */}
      {totalCount > 0 ? (
        <>
          <VictoryPie
            innerRadius={50}
            colorScale={["#00bcd4", "#39208A"]} // Paid (blue), Unpaid (purple)
            data={[
                { x: "Paid", y: paidCount },
                { x: "Unpaid", y: totalCount - paidCount },
            ]}
            labels={({ datum }) => `${datum.y} orders`}
            labelComponent={
                <VictoryTooltip
                flyoutStyle={{ fill: "white", stroke: "#ccc" }}
                style={{ fontSize: 12 }}
                cornerRadius={4}
                pointerLength={8}
                />
            }
            height={240}
            style={{
                data: { stroke: "#fff", strokeWidth: 2 },
                labels: { fontSize: 14, fill: "#333" },
            }}
            />

          <Legend>
            <LegendItem>
              <ColorBox color="#00bcd4" />
              <span style={{ color: "#333", fontSize: "0.95rem" }}>Paid</span>
            </LegendItem>
            <LegendItem>
              <ColorBox color="#39208A" />
              <span style={{ color: "#333", fontSize: "0.95rem" }}>Unpaid</span>
            </LegendItem>
          </Legend>
        </>
      ) : (
        <StatText style={{ marginTop: "24px", fontSize: "1rem", color: "#999" }}>
          No orders yet to show chart
        </StatText>
      )}

      {/* Bar Chart */}
      {monthlySales.length > 0 ? (
        <>
          <Title style={{ marginTop: 40 }}>Monthly Sales</Title>
          <VictoryChart
            theme={VictoryTheme.material}
            domainPadding={70}
            height={300}
          >
            <VictoryAxis
              tickFormat={(t) => t}
              style={{ tickLabels: { fontSize: 12, angle: 0 } }}
            />
            <VictoryAxis dependentAxis tickFormat={(x) => `$${x}`} />
            <VictoryBar
            data={monthlySales}
            x="month"
            y="total"
            labels={({ datum }) => `$${datum.total.toFixed(2)}`}
            labelComponent={
                <VictoryTooltip
                flyoutStyle={{ fill: "#fff", stroke: "#ccc" }}
                style={{ fontSize: 12 }}
                cornerRadius={4}
                pointerLength={6}
                />
            }
            style={{
                data: { fill: "#e09f1d", width: 18 },
            }}
            />
          </VictoryChart>
        </>
      ) : (
        <StatText style={{ marginTop: "24px", fontSize: "1rem", color: "#999" }}>
          No monthly sales data
        </StatText>
      )}
    </Card>
  );
};

export default CrafterStats;
