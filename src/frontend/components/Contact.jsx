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

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Contact = () => {
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null); // 👈 check for signed-in user

  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();

    // Mock user fetch: check if 'user' is in localStorage
    const storedUser = JSON.parse(localStorage.getItem('user'));
    setUser(storedUser);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be signed in to leave a review');
      return;
    }

    toast.success('Review submitted successfully!');
    console.log({ rating, message });
  };

  return (
    <SectionWrapper>
      <ToastContainer position="bottom-right" autoClose={3000} /> {/* ✅ Toast injected here */}

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
