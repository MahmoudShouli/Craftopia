/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import messageService from "../../api/messageService";
import { useUser } from "../../context/UserContext";
import styledElements from "./ChatBox.styled";
import { io } from "socket.io-client";

const socket = io.connect("http://localhost:3000");


const ChatBox = ( { crafterToChatWith }) => {
  const { user } = useUser();

  const [contactedCrafters, setContactedCrafters] = useState([]);
  const [selectedCrafter, setSelectedCrafter] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");


  useEffect(() => {
    const loadCrafters = async () => {
      const chattedWithCrafters = await messageService.getCraftersChattedWith(user.email); 
  
      let merged = [];
      if (crafterToChatWith) {
        const alreadyExists = chattedWithCrafters.some(c => c.email === crafterToChatWith.email);
        merged = alreadyExists ? chattedWithCrafters : [...chattedWithCrafters, crafterToChatWith];
        setContactedCrafters(merged);
      }
      else {
        setContactedCrafters(chattedWithCrafters);
      }
      
    };
    loadCrafters();
  },[]);

  
  const selectCrafter = async (crafter) => {
    setSelectedCrafter(crafter);
    const chat = await messageService.getChatMessages(user.email, crafter.email);
    setMessages(chat);
  };

  const handleSend = async () => {
    let sender = user.email;
    let receiver = selectedCrafter.email;
    let content = messageInput;

    let tempMessage = {
      sender,
      receiver,
      content
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      await messageService.sendMessage({sender, receiver, content});
      //socket.emit('send_message', tempMessage); 
    } catch (error) {
        console.error('Error creating message:', error);
    }

  }
  
 
  return (
    <styledElements.ChatCard>
      <styledElements.Sidebar>
        {contactedCrafters.length === 0 ? (
            <div style={{
            padding: "2rem",
            textAlign: "center",
            color: "#888",
            fontWeight: "bold"
            }}>
            No chats yet!
            </div>
        ) : (
            contactedCrafters.map((crafter) => (
            <styledElements.CrafterItem
                key={crafter.email}
                onClick={() => selectCrafter(crafter)}
                selected={selectedCrafter === crafter.email}
            >
                <styledElements.Avatar> 
                    <img
                        src={crafter.avatarUrl || "/default-avatar.png"}
                        alt="avatar"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                        />
                </styledElements.Avatar>
                <styledElements.CrafterName>{crafter.name}</styledElements.CrafterName>
            </styledElements.CrafterItem>
            ))
        )}
      </styledElements.Sidebar>


      <styledElements.MessageArea>
        {selectedCrafter ? (
          <>
            <styledElements.MessageList>
              {messages.map((msg) => (
                <styledElements.MessageBubble
                  key={msg._id}
                  fromSelf={msg.sender === user.email}
                >
                  {msg.content}
                </styledElements.MessageBubble>
              ))}
            </styledElements.MessageList>
            <styledElements.MessageInputContainer>
              <styledElements.MessageInput
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <styledElements.SendButton onClick={handleSend}>Send</styledElements.SendButton>
            </styledElements.MessageInputContainer>
          </>
        ) : (
          <div style={{ padding: "1rem" }}></div>
        )}
      </styledElements.MessageArea>
    </styledElements.ChatCard>
  );
};

export default ChatBox;
