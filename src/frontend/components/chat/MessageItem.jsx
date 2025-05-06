import React, { useEffect, useState} from "react";
import { MessageBubble, LikeIcon, DeleteIcon } from "./MessageItem.styled";

const MessageItem = ({ msg, isFromSelf, handleLike, onDelete }) => {
    const [animateLike, setAnimateLike] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
  
    useEffect(() => {
      if (msg.liked) {
        setAnimateLike(true);
        const timeout = setTimeout(() => setAnimateLike(false), 300);
        return () => clearTimeout(timeout);
      }
    }, [msg.liked]);
  
    return (
      <MessageBubble
        fromSelf={isFromSelf}
        onContextMenu={(e) => {
          e.preventDefault();
          setShowDelete(true);
        }}
        onMouseLeave={() => setShowDelete(false)}
        onDoubleClick={() => handleLike(msg)}
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

        {showDelete && isFromSelf && (
          <DeleteIcon onClick={() => onDelete(msg._id)}>
            ❌ 
          </DeleteIcon>
        )}
  
        {msg.liked && (
          <LikeIcon animate={animateLike} onMouseDown={(e) => e.preventDefault()}>
            👍
          </LikeIcon>
        )}
      </MessageBubble>
    );
  };
  
  export default MessageItem;