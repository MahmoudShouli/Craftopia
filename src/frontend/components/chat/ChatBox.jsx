/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import messageService from "../../api/messageService";
import { useUser } from "../../context/UserContext";
import styledElements from "./ChatBox.styled";
import { io } from "socket.io-client";
import { FiMaximize, FiMinimize, FiImage } from "react-icons/fi";

const socket = io.connect("http://localhost:3000");


const ChatBox = ( { userToChatWith }) => {
  const { user } = useUser();
  const fileInputRef = useRef();
  const bottomRef = useRef(null);

  const [onlineUsers, setOnlineUsers] = useState([]);

  const [contactedUsers, setContactedUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const loadCrafters = async () => {
      const contacts = await messageService.getContacts(user.email); 
  
      let merged = [];
      if (userToChatWith) {
        const alreadyExists = contacts.some(c => c.email === userToChatWith.email);
        merged = alreadyExists ? contacts : [...contacts, userToChatWith];
        setContactedUsers(merged);
      }
      else {
        setContactedUsers(contacts);
      }
      
    };
    loadCrafters();
  },[]);

  useEffect(() => {
    const lastMessage = messages[messages.length - 1];
  
    if (lastMessage?.content?.includes("cloudinary")) {
      // wait for image to load
      const img = new Image();
      img.src = lastMessage.content;
  
      img.onload = () => {
        bottomRef.current?.scrollIntoView({ behavior: "smooth" });
      };
    } else {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);
  

  useEffect(() => {
    if (!user?.email) return;
  
    socket.emit('join', user.email);
  
    const handler = (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    };
  
    socket.on('receive_message', handler);
  
    return () => {
      socket.off('receive_message', handler);
    };
  }, [user.email]);
  
  
  useEffect(() => {
    socket.on("online_users", (list) => {
      setOnlineUsers(list);
    });
  
    return () => {
      socket.off("online_users");
    };
  }, []);

  const selectCrafter = async (crafter) => {
    setSelectedUser(crafter);
    const chat = await messageService.getChatMessages(user.email, crafter.email);
    setMessages(chat);
  };

  const handleSend = async () => {
    let sender = user.email;
    let receiver = selectedUser.email;
    let content = messageInput;
    let timestamp = new Date().toISOString()

    let tempMessage = {
      sender,
      receiver,
      content,
      timestamp
    };

    setMessages((prevMessages) => [...prevMessages, tempMessage]);

    try {
      await messageService.sendMessage({sender, receiver, content});
      socket.emit('send_message', tempMessage); 
    } catch (error) {
        console.error('Error creating message:', error);
    }

    setMessageInput("");
  }

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file || !selectedUser) return;
  
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
      const receiver = selectedUser.email;
      const content = imageUrl;
      let timestamp = new Date().toISOString()

      let tempMessage = {
        sender,
        receiver,
        content,
        timestamp
      };
  
      setMessages((prevMessages) => [...prevMessages, tempMessage]);
      await messageService.sendMessage({ sender, receiver, content });
      socket.emit('send_message', tempMessage); 
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
        {contactedUsers.length === 0 ? (
            <div style={{
            padding: "2rem",
            textAlign: "center",
            color: "#888",
            fontWeight: "bold"
            }}>
            No chats yet!
            </div>
        ) : (
            contactedUsers.map((chatter) => (
            <styledElements.CrafterItem
                key={chatter.email}
                onClick={() => selectCrafter(chatter)}
                selected={selectedUser?.email === chatter.email}
            >
                <styledElements.Avatar> 
                    <img
                        src={chatter.avatarUrl || "/default-avatar.png"}
                        alt="avatar"
                        style={{ width: "100%", height: "100%", borderRadius: "50%" }}
                    />
                    {onlineUsers.includes(chatter.email) ? <styledElements.OnlineDot /> : <styledElements.OfflineDot/>}
                </styledElements.Avatar>
                <styledElements.CrafterName>{chatter.name}</styledElements.CrafterName>
            </styledElements.CrafterItem>
            ))
        )}
      </styledElements.Sidebar>


      <styledElements.MessageArea>
        {selectedUser ? (
          <>
            <styledElements.MessageList>
              {messages.map((msg) => (
                <styledElements.MessageBubble
                  key={msg._id || `${msg.sender}-${Math.random()}`}
                  fromSelf={msg.sender === user.email}
                >
                  <div style={{ marginBottom: "0.3rem" }}>
                    <span style={{ fontWeight: "bold", fontSize: "1rem", marginRight: "0.5rem" }}>
                      {msg.senderName || msg.sender.split("@")[0]}
                    </span>
                    <span style={{ fontSize: "0.75rem", fontWeight: "normal", color: "#888" }}>
                      {new Date(msg.timestamp).toLocaleString("en-US", {
                        month: "numeric",
                        day: "numeric",
                        year: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                        hour12: true,
                      })}
                    </span>
                  </div>
                
                  {msg.content.startsWith("http") && msg.content.includes("cloudinary") ? (
                    <img
                      src={msg.content}
                      alt="sent"
                      style={{ maxWidth: "100%", borderRadius: "0.5rem" }}
                    />
                  ) : (
                    <div style={{ whiteSpace: "pre-wrap" }}>{msg.content}</div>
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
