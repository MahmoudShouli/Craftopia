/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef } from "react";
import messageService from "../../api/messageService";
import { useUser } from "../../context/UserContext";
import styledElements from "./ChatBox.styled";
import { io } from "socket.io-client";
import { FiMaximize, FiMinimize, FiImage } from "react-icons/fi";
import MessageItem from "./MessageItem";
import { socket } from "../../../utils/socket";

const ChatBox = ( { userToChatWith }) => {
  const { user } = useUser();
  const fileInputRef = useRef();
  const bottomRef = useRef(null);
  const shouldScrollRef = useRef(true);


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
    if (!shouldScrollRef.current) return; // block scroll
  
    const lastMessage = messages[messages.length - 1];
  
    if (lastMessage?.content?.includes("cloudinary")) {
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
    const handleOnlineUsers = (list) => {
      setOnlineUsers(list);
    };
  
    socket.on("online_users", handleOnlineUsers);
  
    return () => {
      socket.off("online_users", handleOnlineUsers);
    };
  }, []);

  useEffect(() => {
    socket.emit("get_online_users");
  
    const handleOnlineUsers = (list) => {
      setOnlineUsers(list);
    };
  
    socket.on("take_online_users", handleOnlineUsers);
  
    return () => {
      socket.off("take_online_users", handleOnlineUsers);
    };
  }, []);

  useEffect(() => {
    const handleLikeUpdate = ({ messageId, liked }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === messageId ? { ...msg, liked } : msg
        )
      );
    };
  
    socket.on("message_liked", handleLikeUpdate);
    return () => socket.off("message_liked", handleLikeUpdate);
  }, []);
  
  
  useEffect(() => {
    socket.on("message_deleted", ({ messageId }) => {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    });
  
    return () => socket.off("message_deleted");
  }, []);
  
    

  const selectCrafter = async (crafter) => {
    setSelectedUser(crafter);
    const chat = await messageService.getChatMessages(user.email, crafter.email);
    setMessages(chat);
  };

  const handleSend = async () => {

    shouldScrollRef.current = true;
    
    let sender = user.email;
    let receiver = selectedUser.email;
    let content = messageInput;
   
    try {
      const newMessage = await messageService.sendMessage({sender, receiver, content});
      setMessages((prevMessages) => [...prevMessages, newMessage]);

      socket.emit('send_message', newMessage); 
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


  const handleLike = async (msg) => {

    shouldScrollRef.current = false;

    if (!msg._id || msg.sender === user.email) return; // prevent like if no ID or from self
  
    try {
      const updated = await messageService.likeMessage(msg._id);
      setMessages((prev) =>
        prev.map((m) => (m._id === updated._id ? updated : m))
      );
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };
  

  const handleDelete = async (id) => {

    shouldScrollRef.current = false;

    try {
      await messageService.deleteMessage(id);
      setMessages((prev) => prev.filter((m) => m._id !== id));
    } catch (err) {
      console.error("Failed to delete:", err);
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
                <MessageItem 
                  key={msg._id || `${msg.sender}-${Math.random()}`}
                  msg={msg}
                  isFromSelf={msg.sender === user.email}
                  handleLike={handleLike}
                  onDelete={handleDelete}
                />
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
