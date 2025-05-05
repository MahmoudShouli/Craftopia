import styled from "styled-components";

const ChatCard = styled.div`
  display: flex;
  width: 100%;
  height: 80vh;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const Sidebar = styled.div`
  width: 14%;
  background-color: #f4f4f4;
  border-right: 1px solid #ddd;
  display: flex;
  flex-direction: column;
`;

const CrafterItem = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  cursor: pointer;
  background-color: ${({ selected }) => (selected ? "#e0e0e0" : "transparent")};

  &:hover {
    background-color: #ddd;
  }
`;

const Avatar = styled.div`
  width: 70px;
  height: 70px;
  background-color: #6a380f;
  color: white;
  font-weight: bold;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CrafterName = styled.div`
  font-weight: 500;
`;

const MessageArea = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const MessageList = styled.div`
  flex: 1;
  padding: 1rem;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const MessageBubble = styled.div`
  align-self: ${({ fromSelf }) => (fromSelf ? "flex-end" : "flex-start")};
  background-color: ${({ fromSelf }) => (fromSelf ? "#d1e7dd" : "#f0f0f0")};
  padding: 0.75rem 1rem;
  border-radius: 20px;
  max-width: 60%;
`;

const MessageInputContainer = styled.div`
  display: flex;
  padding: 0.5rem;
  border-top: 1px solid #ddd;
`;

const MessageInput = styled.input`
  flex: 1;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 1rem;
  margin-right: 0.5rem;
`;

const SendButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 1rem;
  padding: 0.75rem 1.5rem;
  cursor: pointer;

  &:hover {
    background-color: #4e2709;
  }
`;

const styledElements = {
  ChatCard,
  Sidebar,
  CrafterItem,
  Avatar,
  CrafterName,
  MessageArea,
  MessageList,
  MessageBubble,
  MessageInputContainer,
  MessageInput,
  SendButton,
};

export default styledElements;
