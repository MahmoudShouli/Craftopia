import styled from "styled-components";

export const CardContainer = styled.div`
  width: 250px;
  padding: 1.5rem;
  background-color: #fff;
  border: 2px solid #6a380f;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.75rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
  margin-top: 25px;
`;

export const CrafterName = styled.h3`
  font-size: 1.2rem;
  color: #6a380f;
  margin: 0;
`;

export const CrafterCraft = styled.p`
  font-size: 1rem;
  color: #444;
  margin: 0;
`;

export const ContactButton = styled.button`
  margin-top: 1rem;
  padding: 0.5rem 1.2rem;
  border: none;
  border-radius: 20px;
  background-color: #6a380f;
  color: white;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #8d5120;
  }
`;
