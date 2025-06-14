/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import messageService from "../../api/messageService";
import notificationService from "../../api/notificationService";
import { getUserByEmail } from "../../api/userService";
import { useUser } from "../../context/UserContext";
import styledElements from "./ChatBox.styled";
import { FiMaximize, FiMinimize, FiImage } from "react-icons/fi";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import MessageItem from "./MessageItem";
import { socket } from "../../../utils/socket";

const ChatBox = ({ userToChatWith, mode = "private", workshopInfo = null, members = null }) => {
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
  const [showSidebar, setShowSidebar] = useState(true);
  const [senderDetailsMap, setSenderDetailsMap] = useState({});

  const [mentionListVisible, setMentionListVisible] = useState(false);
  const [filteredMentions, setFilteredMentions] = useState([]);
  const [mentionQuery, setMentionQuery] = useState("");
  const [caretPos, setCaretPos] = useState(0);


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
    if (mode == "private")
      loadCrafters();
  },[]);

  useEffect(() => {
    const loadMessages = async () => {
      if (mode === "group" && workshopInfo?.name) {
        const chat = await messageService.getChatMessages("group", workshopInfo.name);
        setMessages(chat);
      }
    };
    loadMessages();
  }, [mode, workshopInfo]);

  useEffect(() => {
    if (!shouldScrollRef.current) return;
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
    if (!user?.email) return;
    socket.emit("join", user.email);

    const handler = (data) => {
      if (mode === "group" && data.receiver === workshopInfo?.name) {
        setMessages((prev) => [...prev, data]);
      } else if (mode === "private" && selectedUser && data.receiver === user.email) {
        setMessages((prev) => [...prev, data]);
      }
    };

    socket.on("receive_message", handler);
    return () => socket.off("receive_message", handler);
  }, [user.email, selectedUser, mode, workshopInfo]);

  useEffect(() => {
    socket.on("online_users", (list) => setOnlineUsers(list));
    socket.emit("get_online_users");
    return () => socket.off("online_users");
  }, []);

  useEffect(() => {
    socket.on("message_liked", ({ messageId, liked }) => {
      setMessages((prev) =>
        prev.map((msg) => (msg._id === messageId ? { ...msg, liked } : msg))
      );
    });
    return () => socket.off("message_liked");
  }, []);

  useEffect(() => {
    socket.on("message_deleted", ({ messageId }) => {
      setMessages((prev) => prev.filter((m) => m._id !== messageId));
    });
    return () => socket.off("message_deleted");
  }, []);


  useEffect(() => {
    const fetchSenderDetails = async () => {
      const emails = [...new Set(messages.map((m) => m.sender))];
      const map = {};
      for (const email of emails) {
        const profile = await getUserByEmail(email);
        map[email] = profile;
      }
      setSenderDetailsMap(map);
    };

    if (messages.length) {
      fetchSenderDetails();
    }
  }, [messages]);

  const selectCrafter = async (crafter) => {
    setSelectedUser(crafter);
    const chat = await messageService.getChatMessages(user.email, crafter.email);
    setMessages(chat);
  };

  const handleSend = async () => {
    shouldScrollRef.current = true;
    const sender = user.email;
    const receiver = mode === "group" ? workshopInfo.name : selectedUser.email;
    const content = messageInput;

    try {
      const newMessage = await messageService.sendMessage({ sender, receiver, content });
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send_message", newMessage);

      // ✅ Mention detection (only in group mode)
      if (mode === "group" && members?.length > 0) {
        const mentionRegex = /@([A-Za-z]+\s?[A-Za-z]*)/g;
        const mentionedNames = [...new Set((content.match(mentionRegex) || []).map(m => m.slice(1)))]; // remove '@'

        mentionedNames.forEach(async (name) => {
          const matchedUser = members.find((m) => m.name.toLowerCase() === name.toLowerCase());
          if (matchedUser && matchedUser.email !== user.email) {
            const notification = {
              text: `${user.name} mentioned you in a message.`,
              linkTo: "Workshop",
              email: matchedUser.email,
            };
            await notificationService.createNotification(notification);
            socket.emit("notification", {
              to: matchedUser.email,
              notification,
            });
          }
        });
      }

      // ✅ Standard notification for private message
      if (mode === "private") {
        const notification = {
          text: `${user.name} sent you a message.`,
          linkTo: "Chatting",
          email: receiver,
        };
        await notificationService.createNotification(notification);
        socket.emit("notification", {
          to: receiver,
          notification,
        });
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setMessageInput("");
  };


  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

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
      const receiver = mode === "group" ? workshopInfo.name : selectedUser.email;
      const content = imageUrl;

      const newMessage = await messageService.sendMessage({ sender, receiver, content });
      setMessages((prev) => [...prev, newMessage]);
      socket.emit("send_message", newMessage);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  const handleLike = async (msg) => {
    shouldScrollRef.current = false;
    if (!msg._id || msg.sender === user.email) return;

    try {
      const updated = await messageService.likeMessage(msg._id);
      setMessages((prev) => prev.map((m) => (m._id === updated._id ? updated : m)));
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

  const insertMention = (mentionName) => {
    const before = messageInput.slice(0, caretPos);
    const after = messageInput.slice(caretPos);
    const lastAtIndex = before.lastIndexOf(mentionQuery);
    const newInput =
      before.slice(0, lastAtIndex) + "@" + mentionName + " " + after;

    setMessageInput(newInput);
    setMentionListVisible(false);
  };


  return (
    <styledElements.ChatCard fullscreen={isFullscreen} group={mode === "group"}>
      {mode === "private" && (
        <styledElements.FullscreenToggle onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </styledElements.FullscreenToggle>
      )}
      

      {mode === "private" && (
        <styledElements.SidebarToggle
          sidebarVisible={showSidebar}
          onClick={() => setShowSidebar(!showSidebar)}
        >
          {showSidebar ? <FaChevronLeft /> : <FaChevronRight />}
        </styledElements.SidebarToggle>
      )}

      {(mode === "private" && showSidebar) ? (
        <styledElements.Sidebar>
          {contactedUsers.length === 0 ? (
            <div style={{ padding: "2rem", textAlign: "center", color: "#888", fontWeight: "bold" }}>
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
                  {onlineUsers.includes(chatter.email) ? <styledElements.OnlineDot /> : <styledElements.OfflineDot />}
                </styledElements.Avatar>
                <styledElements.CrafterName>{chatter.name}</styledElements.CrafterName>
              </styledElements.CrafterItem>
            ))
          )}
        </styledElements.Sidebar>
      ) : (
        <styledElements.Sidebar style={{ width: 0 }} />
      )}


      <styledElements.MessageArea>
        {(mode === "private" && selectedUser) || (mode === "group" && workshopInfo) ? (
          <>
            <styledElements.MessageList>
              {messages.map((msg) => (
                <MessageItem
                  key={msg._id || `${msg.sender}-${Math.random()}`}
                  msg={msg}
                  isFromSelf={msg.sender === user.email}
                  handleLike={handleLike}
                  onDelete={handleDelete}
                  avatar={
                    msg.sender === user.email
                      ? user.avatarUrl
                      : mode === "private"
                        ? selectedUser?.avatarUrl || "/default-avatar.png"
                        : senderDetailsMap[msg.sender]?.avatarUrl || "/default-avatar.png"
                  }
                  senderName={senderDetailsMap[msg.sender]?.name || msg.sender}
                  mode={mode}
                />
              ))}
              <div ref={bottomRef} />
            </styledElements.MessageList>

            <styledElements.MessageInputContainer>
              <styledElements.MessageInput
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => {
                  const value = e.target.value;
                  setMessageInput(value);

                 if (mode === "group") {
                  const cursorIndex = e.target.selectionStart;
                  const upToCursor = value.slice(0, cursorIndex);
                  const mentionMatch = upToCursor.match(/@([^\s@]*)$/); // match last "@something"

                  if (mentionMatch) {
                    const query = mentionMatch[1].toLowerCase();
                    const queryParts = query.split(" "); // to support "john doe"

                    const filtered = members.filter((m) => {
                      const fullName = m.name.toLowerCase();
                      const [first, last] = fullName.split(" ");
                      const firstMatch = first?.startsWith(queryParts[0]);
                      const lastMatch = queryParts[1]
                        ? last?.startsWith(queryParts[1])
                        : true;
                      return firstMatch && lastMatch && m.email !== user.email;
                    });

                    setFilteredMentions(filtered);
                    setMentionListVisible(true);
                    setMentionQuery("@" + query);
                    setCaretPos(cursorIndex);
                  } else {
                    setMentionListVisible(false);
                  }
                }


                }}

                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />

              {mentionListVisible && filteredMentions.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    bottom: "60px",
                    left: "20px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    borderRadius: "8px",
                    zIndex: 10,
                    width: "250px",
                    maxHeight: "200px",
                    overflowY: "auto",
                  }}
                >
                  {filteredMentions.map((m) => (
                    <div
                      key={m.email}
                      onClick={() => insertMention(m.name)}
                      style={{
                        padding: "10px",
                        cursor: "pointer",
                        borderBottom: "1px solid #eee",
                      }}
                    >
                      @{m.name}
                    </div>
                  ))}
                </div>
              )}


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