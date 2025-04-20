import styled from "styled-components";

export const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f7e9d7;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const ProfileContainer = styled.div`
  flex: 1;
  padding: 3rem;
`;

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

export const UserCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 700px;
`;

export const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

export const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background-color: #d2b48c;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
`;

export const UserDetails = styled.div`
  color: #6a380f;
  flex: 1;
  margin-left: 1rem;
`;

export const Name = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`;

export const Email = styled.div`
  font-size: 1rem;
  color: #888;
`;

export const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
  justify-content: start;
`;

export const Field = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
  margin-top: 70px;
`;

export const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #6a380f;
  font-size: 1rem;
`;

export const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  .input-icon {
    position: absolute;
    left: 0.9rem;
    font-size: 1.5rem;
    color: #6a380f;
  }
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.7rem 1rem 0.7rem 2.5rem;
  border: 2px solid #6a380f;
  border-radius: 8px;
  font-size: 1.3rem;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "white")};

  &::placeholder {
    color: #aaa;
  }
`;

export const EditButton = styled.button`
  background-color: #444;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  cursor: pointer;
  margin-right: 19%;
`;

export const SaveButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1.3rem;
  cursor: pointer;
  margin-right: 19%;
`;
