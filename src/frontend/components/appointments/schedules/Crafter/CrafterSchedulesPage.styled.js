import styled from "styled-components";

export const SchedulesCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;

export const SchedulesInnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const LeftSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 100%;
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 100%;
`;
