import React, { useState, useEffect } from 'react';
import {
  SectionWrapper,
  SectionTitle,
  ContentWrapper,
  ContactInfo,
  ContactItem,
  FormWrapper,
  Textarea,
  SubmitButton,
  ContactTitle
} from '../styles/Contact.styled';

import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import StarRating from './StarRating';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ rating, message });
  };

  return (
    <SectionWrapper>
      <ContentWrapper>
        <ContactInfo data-aos="fade-right">
        <ContactTitle>Contact Us</ContactTitle>
          <ContactItem>
            <FaEnvelope className="icon" />
            <strong>Email:</strong>
            <span>Craftopia@gmail.com</span>
          </ContactItem>
          <ContactItem>
            <FaPhoneAlt className="icon" />
            <strong>Phone:</strong>
            <span>+972592757823</span>
          </ContactItem>
          <ContactItem>
            <FaMapMarkerAlt className="icon" />
            <strong>Address:</strong>
            <span>Palestine, Nablus</span>
          </ContactItem>
        </ContactInfo>

        <FormWrapper onSubmit={handleSubmit} data-aos="fade-left">
          <h3>Leave a Review</h3>
          <StarRating rating={rating} onRatingChange={setRating} />
          <Textarea
            placeholder="Write your review here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <SubmitButton type="submit">Send Review</SubmitButton>
        </FormWrapper>
      </ContentWrapper>
    </SectionWrapper>
  );
};

export default Contact;
