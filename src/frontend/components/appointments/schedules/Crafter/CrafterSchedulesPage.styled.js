import styled from "styled-components";

export const CrafterSchedulesWrapper = styled.div`
  display: flex;
  height: 100vh;
  padding: 2rem;
  background-color: #f9f9f9;
  gap: 2rem;
`;

export const LeftColumn = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`;

export const RightColumn = styled.div`
  flex: 1;
  overflow-y: auto;
  background-color: #fff;
  border-radius: 10px;
  padding: 1.5rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
