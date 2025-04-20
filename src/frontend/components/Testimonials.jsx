import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import {
  SectionWrapper,
  SectionTitle,
  Viewport,
  ScrollWrapper,
  CardRow,
  CardItem,
  LeftArrow,
  RightArrow,
} from '../styles/Testimonials.styled';
import Card from './Card';

const Testimonials = () => {
  const [reviews, setReviews] = useState([]);
  const [offset, setOffset] = useState(0);
  const maxVisible = 4;
  const totalPages = Math.ceil(reviews.length / maxVisible);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axios.get('http://localhost:3000/reviews/getAllReviews');
        setReviews(res.data);
      } catch (error) {
        console.error('Failed to fetch reviews:', error.response?.data || error.message);
      }
    };

    fetchReviews();
  }, []);

  const handleNext = () => {
    if (offset < totalPages - 1) setOffset(offset + 1);
  };

  const handlePrev = () => {
    if (offset > 0) setOffset(offset - 1);
  };

  return (
    <SectionWrapper id="reviews">
      <SectionTitle>Our Reviews</SectionTitle>

      <Viewport>
        {reviews.length > maxVisible && (
          <LeftArrow onClick={handlePrev}>
            <FaChevronLeft />
          </LeftArrow>
        )}

        <ScrollWrapper $offset={offset}>
          <CardRow $total={reviews.length}>
            {reviews.map((r, idx) => (
              <CardItem key={idx}>
                <Card
                  name={r.user?.name || 'User'}
                  role={r.user?.role || 'Customer'}
                  message={r.message}
                  avatar=""
                  rating={r.rating}
                />
              </CardItem>
            ))}
          </CardRow>
        </ScrollWrapper>

        {reviews.length > maxVisible && (
          <RightArrow onClick={handleNext}>
            <FaChevronRight />
          </RightArrow>
        )}
      </Viewport>
    </SectionWrapper>
  );
};

export default Testimonials;
