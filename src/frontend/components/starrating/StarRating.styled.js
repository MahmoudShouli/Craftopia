import styled from "styled-components";

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

export const Star = styled.span`
  font-size: 2rem;
  color: ${({ $filled }) => ($filled ? "#ffc107" : "#ccc")};
  transition: color 0.2s;
`;
