import styled from "styled-components";

export const PageWrapper = styled.div`
  background-color: #f7e9d7;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const PreferencesCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 800px;
  width: 90%;
  max-width: 85%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const ContentWrapper = styled.div`
  width: 100%;
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SectionWrapper = styled.div`
  width: 100%;
  margin-bottom: 2.5rem;
`;

export const SectionTitle = styled.h4`
  margin-top: 2rem;
  margin-bottom: 1rem;
  text-align: center;
  font-size: 1.6rem;
  color: #6a380f;
`;

export const ColorsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
`;

export const ColorCircle = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  justify-content: center;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.4);
  }
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-top: auto;

  & > * {
    margin-left: auto;
    margin-right: auto;
  }
`;

export const AddColorButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  margin-top: 0.5rem;
`;

export const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
`;

export const TagBox = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: 2px solid #6a380f;
  font-size: 1.2rem;
  font-weight: 600;
  background-color: ${(props) => (props.selected ? "#6a380f" : "#fff")};
  color: ${(props) => (props.selected ? "#fff" : "#6a380f")};
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;
