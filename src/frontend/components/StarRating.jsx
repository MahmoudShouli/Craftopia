import React, { useState } from 'react';
import styled from 'styled-components';

const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  cursor: pointer;
`;

const Star = styled.span`
  font-size: 2rem;
  color: ${({ filled }) => (filled ? 'gold' : '#ccc')};
  transition: color 0.2s;
`;

const StarRating = ({ rating, onRatingChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <StarsWrapper>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          filled={star <= (hovered || rating)}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
        >
          ★
        </Star>
      ))}
    </StarsWrapper>
  );
};

export default StarRating;
