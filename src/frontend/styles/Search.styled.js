import styled from "styled-components";

export const SearchCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const SearchTitle = styled.h2`
  font-size: 2rem;
  color: #6a380f;
  margin-bottom: 1rem;
`;

export const SearchDescription = styled.p`
  font-size: 1.1rem;
  color: #666;
  margin-bottom: 2rem;
`;

export const SearchInputGroup = styled.div`
  display: flex;
  gap: 1rem;
`;

export const SearchInput = styled.input`
  flex: 1;
  padding: 0.8rem 1rem;
  border: 2px solid #6a380f;
  border-radius: 8px;
  font-size: 1.1rem;

  &::placeholder {
    color: #aaa;
  }
`;

export const SearchButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.1rem;
  cursor: pointer;
`;
