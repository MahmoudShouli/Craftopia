import styled from "styled-components";

export const SearchCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start; /* ⬅️ change this */
  align-items: center; /* ⬅️ center children horizontally */
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
  justify-content: center;
  align-items: center;
  align-self: center; /* center in SearchCard */
  margin-bottom: 2rem;
  border: 2px solid #6a380f;
  border-radius: 25px;
  overflow: hidden;
`;

export const SearchInput = styled.input`
  padding: 0.8rem 1rem;
  border: none;
  font-size: 1.1rem;
  outline: none;
  width: 900px;

  &::placeholder {
    color: #aaa;
  }
`;

export const SearchButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 0.8rem 1.5rem;
  border: none;
  font-size: 1.1rem;
  cursor: pointer;
  height: 100%;
`;

export const FilterBoxGroup = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 5rem;
`;

export const FilterBox = styled.button`
  padding: 0.6rem 1.5rem;
  border-radius: 25px;
  background-color: #f7e9d7;
  color: #6a380f;
  font-size: 1.3rem;
  font-weight: 500;
  border: 2px solid #6a380f;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6a380f;
    color: white;
  }
`;

export const UsersGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
  margin-top: 2rem;
`;
export const UsersGridWrapper = styled.div`
  flex: 1;
  width: 100%;
  max-height: 400px; /* Adjust based on your design */
  overflow-y: auto;
  padding-right: 0.5rem;
  margin-top: 1rem;
`;
