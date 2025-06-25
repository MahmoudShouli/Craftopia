import React from 'react';
import {
  CardWrapper,
  Name,
  Role,
  Message,
  Rating,
} from './Testimonials.styled';
import UserAvatar from '../../useravatar/UserAvatar';

const ReviewCard = ({
  name,
  role,
  message,
  avatar,
  rating,
  delay,
  backgroundColor = "#fff",
  layout = "default", // "default" or "horizontal"
}) => {
  return (
    <CardWrapper
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.3, delay: delay / 1000 }}
      whileHover={{
        border: '2px solid #6a380f',
        backgroundColor: '#fff',
        transition: { duration: 0.3 },
      }}
      style={{
        backgroundColor,
        display: layout === "horizontal" ? "flex" : "block",
        gap: layout === "horizontal" ? "1rem" : "0",
        alignItems: layout === "horizontal" ? "center" : "initial",
      }}
    >
      {/* Avatar layout */}
      <div
        style={{
          display: "flex",
          justifyContent: layout === "default" ? "center" : "flex-start",
          width: layout === "horizontal" ? "auto" : "100%",
          marginBottom: layout === "default" ? "1rem" : "0",
        }}
      >
        <UserAvatar
          previewUrl={avatar}
          uploading={false}
          user={{ name }}
          width={150}
          height={150}
        />
      </div>

      {/* Info section */}
      <div style={{ flex: 1 }}>
        <Name>{name}</Name>
        <Role>{role}</Role>
        <Message>{message}</Message>
        <Rating>
          {'⭐'.repeat(rating)}
          {'☆'.repeat(5 - rating)}
        </Rating>
      </div>
    </CardWrapper>
  );
};

export default ReviewCard;
