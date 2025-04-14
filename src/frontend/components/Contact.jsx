import React, { useState, useEffect } from 'react';
import {
  SectionWrapper,
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
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useUser } from '../context/UserContext';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const { user } = useUser(); // ✅ get user from context

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be signed in to leave a review');
      return;
    }

    console.log({
      email: user?.email,
      rating,
      message
    });
    

    try {
      const response = await axios.post('http://localhost:3000/api/reviews/addReview', {
        email: user.email,
        rating,
        message,
      });

      toast.success('Review submitted successfully!');
      setRating(0);
      setMessage('');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong while saving your review.');
    }
  };

  return (
    <SectionWrapper id="contact">
      <ToastContainer position="bottom-right" autoClose={3000} />
      
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
