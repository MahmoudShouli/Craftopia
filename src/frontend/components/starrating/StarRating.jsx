import React, { useState } from 'react';
import { StarsWrapper, Star } from "./StarRating.styled";

const StarRating = ({ rating, onRatingChange }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <StarsWrapper>
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          $filled={star <= (hovered || rating)}  
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
