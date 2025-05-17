import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  gap: 2rem;
  min-height: 400px;
  width: 800px;
`;

export const Section = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

export const Divider = styled.div`
  width: 2px;
  background-color: #ccc;
`;

export const Title = styled.h3`
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: #333;
`;

export const CrafterSelect = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const CrafterOption = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  background-color: ${(props) =>
    props.selected ? "rgb(170, 175, 172)" : "#f9f9f9"};
  border: 1px solid #ddd;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
`;

export const CheckpointList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

export const CheckpointInput = styled.input`
  padding: 0.6rem 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 0.95rem;
`;

export const AddCheckpointButton = styled.button`
  margin-top: 1rem;
  align-self: flex-start;
  background: none;
  border: none;
  color: #6a380f;
  font-weight: 700;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const CreateButton = styled.button`
  margin-top: 2rem;
  background-color: #6a380f;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
  align-self: center;

  &:hover {
    background-color: rgb(161, 92, 26);
  }
`;

export const NamePopupContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  width: 300px;
`;

export const NameInput = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;
