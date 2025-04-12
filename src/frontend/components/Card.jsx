import React from 'react';
import {
  CardWrapper,
  Name,
  Role,
  Message,
  Avatar,
  Stars,
  Star
} from '../styles/Testimonials.styled';

const Card = ({ name, role, message, delay, avatar, rating = 5 }) => {
  return (
    <CardWrapper data-aos="fade-up" data-aos-delay={delay}>
      <Avatar>{avatar ? <img src={avatar} alt={name} /> : name[0]}</Avatar>
      <Stars>
        {[...Array(rating)].map((_, i) => (
          <Star key={i}>⭐</Star>
        ))}
      </Stars>
      <Message>"{message}"</Message>
      <Name>{name}</Name>
      <Role>{role}</Role>
    </CardWrapper>
  );
};

export default Card;
