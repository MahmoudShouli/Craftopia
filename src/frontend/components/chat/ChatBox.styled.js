import styled from "styled-components";

export const ChatCard = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  height: 80vh;
  background-color: #fff;
  border-radius: 1rem;
  overflow: hidden;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  ${({ fullscreen }) =>
    fullscreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    border-radius: 0;
    z-index: 9999;
  `}
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
  background-color: ${({ selected }) => (selected ? "#ddd" : "transparent")};
  border-left: ${({ selected }) =>
    selected ? "4px solid #6a380f" : "4px solid transparent"};
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #ddd;
  }
`;

const Avatar = styled.div`
  position: relative;
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
  align-self: "flex-start";
  padding: 0.75rem 1rem;
  border-radius: 20px;
  max-width: 60%;
  width: fit-content;
  word-break: break-word;
  margin-bottom: 1rem;
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

const FullscreenToggle = styled.button`
  position: absolute;
  top: 1rem;
  right: 2rem;
  background: none;
  border: none;
  cursor: pointer;
  color: #6a380f;
  font-size: 1.5rem;
  z-index: 10;

  &:hover {
    color: #4e2709;
  }
`;

const ImageUploadButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: #6a380f;
  font-size: 2rem;
  margin-right: 0.6rem;
  margin-top: 0.2rem;

  &:hover {
    color: #4e2709;
  }
`;

const OnlineDot = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background-color: #00c853;
  border-radius: 50%;
  border: 2px solid white;
`;

const OfflineDot = styled.div`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 18px;
  height: 18px;
  background-color: rgb(154, 167, 159);
  border-radius: 50%;
  border: 2px solid white;
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
  FullscreenToggle,
  ImageUploadButton,
  OnlineDot,
  OfflineDot,
};

export default styledElements;
