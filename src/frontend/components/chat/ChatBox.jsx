/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import messageService from "../../api/messageService";
import { useUser } from "../../context/UserContext";
import styledElements from "./ChatBox.styled";
import { io } from "socket.io-client";
import { FiMaximize, FiMinimize, FiImage } from "react-icons/fi";

const socket = io.connect("http://localhost:3000");


const ChatBox = ( { crafterToChatWith }) => {
  const { user } = useUser();
  const fileInputRef = useRef();
  const bottomRef = useRef(null);


  const [contactedCrafters, setContactedCrafters] = useState([]);
  const [selectedCrafter, setSelectedCrafter] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const [isFullscreen, setIsFullscreen] = useState(false);

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

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  

  
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

    setMessageInput("");
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedCrafter) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const res = await fetch("http://localhost:3000/messages/upload-image", {
        method: "POST",
        body: formData,
      });
  
      const data = await res.json();
      const imageUrl = data.url;
  
      const sender = user.email;
      const receiver = selectedCrafter.email;
      const content = imageUrl;
  
      setMessages((prev) => [...prev, { sender, receiver, content }]);
      await messageService.sendMessage({ sender, receiver, content });
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

 
  return (
    <styledElements.ChatCard fullscreen={isFullscreen}>
      <styledElements.FullscreenToggle onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </styledElements.FullscreenToggle>
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
                selected={selectedCrafter?.email === crafter.email}
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
                  key={msg._id || `${msg.sender}-${Math.random()}`} // fallback key
                  fromSelf={msg.sender === user.email}
                >
                  {msg.content.startsWith("http") && msg.content.includes("cloudinary") ? (
                    <img src={msg.content} alt="sent" style={{ maxWidth: "100%", borderRadius: "0.5rem" }} />
                  ) : (
                    msg.content
                  )}
                </styledElements.MessageBubble>
              ))}
              <div ref={bottomRef} />
            </styledElements.MessageList>

            <styledElements.MessageInputContainer>
              <styledElements.MessageInput
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault(); // prevent new line
                    handleSend();
                  }
                }}
              />

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleImageUpload}
              />

              <styledElements.ImageUploadButton onClick={() => fileInputRef.current.click()}>
                <FiImage />
              </styledElements.ImageUploadButton>


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
