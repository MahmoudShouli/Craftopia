import React from 'react';
import {
  CardWrapper,
  Avatar,
  Name,
  Role,
  Message,
  Rating,
} from './home/testimonials/Testimonials.styled';

const Card = ({ name, role, message, avatar, rating, delay }) => {
  const renderAvatar = () => {
    if (avatar) {
      return <Avatar src={avatar} alt={name || 'User'} />;
    }
  
    const initial = name?.charAt(0)?.toUpperCase() || '?';
    return <Avatar>{initial}</Avatar>;
  };

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
      >
      {renderAvatar()}
      <Name>{name}</Name>
      <Role>{role}</Role>
      <Message>{message}</Message>
      <Rating>
        {'⭐'.repeat(rating)}
        {'☆'.repeat(5 - rating)}
      </Rating>
    </CardWrapper>
  );
};

export default Card;
