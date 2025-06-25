import React from "react";
import styled from "styled-components";
import StatsBox from "./StatsBox";
import TemplateTrendsChart from "./TemplateTrendsChart";

const Container = styled.div`
  display: flex;
  width: 100%;
  gap: 0;
`;

const Left = styled.div`
  flex: 0 0 65%;
  height: 100%;
`;

const Right = styled.div`
  flex: 0 0 35%;
  height: 100%;
`;

const BoxWrapper = styled.div`
  background: none;
  border-radius: 16px;
  padding: 1rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1.5rem;
`;


const StatsOverview = () => {
  return (
    <Container style={{ height: "100%" }}>
      <Left>
        <BoxWrapper>
          <StatsBox />
        </BoxWrapper>
      </Left>
      <Right>
        <BoxWrapper>
          <TemplateTrendsChart />
        </BoxWrapper>
      </Right>
    </Container>
  );
};

export default StatsOverview;
