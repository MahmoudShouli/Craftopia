import styled from "styled-components";

export const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

export const HeaderLeft = styled.div``;

export const WelcomeText = styled.div`
  color: #6a380f;
  font-size: 1.8rem;
  font-weight: 600;
`;

export const DateText = styled.div`
  font-size: 0.95rem;
  color: #6a380f;
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const SearchBarWrapper = styled.div`
  display: flex;
  align-items: center;
  background-color: white;
  padding: 0.6rem 1rem;
  border-radius: 12px;
  gap: 0.6rem;
  font-size: 0.95rem;
  color: #aaa;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);

  .icon {
    font-size: 1.3rem;
  }
`;

export const SearchInput = styled.input`
  border: none;
  outline: none;
  background: transparent;
  font-size: 0.95rem;
  width: 100%;
  color: #333;

  &::placeholder {
    color: #aaa;
  }
`;

export const IconWrapper = styled.div`
  background-color: #f8f8f8;
  padding: 0.6rem;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  transition: background-color 0.3s ease;
  cursor: pointer;

  &:hover {
    background-color: #f0f0f0;
  }
`;

export const Icon = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
  color: #999;
`;
