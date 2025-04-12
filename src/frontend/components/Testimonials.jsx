import React, { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import {
  SectionWrapper,
  SectionTitle,
  CardsContainer
} from '../styles/Testimonials.styled';
import Card from './Card';


const Testimonials = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: false });
    AOS.refresh();
  }, []);

  const testimonials = [
    {
      name: 'Ahmad',
      role: 'Customer',
      message: 'Craftopia helped me find a reliable carpenter in minutes!',
      avatar: '', // no image = first letter
      rating: 5,
    },
    {
      name: 'Rana',
      role: 'Electrician',
      message: 'It’s so easy to connect with new clients and grow my business.',
      avatar: '', // can insert image path
      rating: 4,
    },
    {
      name: 'Yousef',
      role: 'Plumber',
      message: 'I love how professional and fast the platform is!',
      avatar: '',
      rating: 5,
    },
  ];

  return (
    <SectionWrapper>
      <SectionTitle data-aos="fade-down" data-aos-delay="200">
             Our Reviews
            </SectionTitle>
      <CardsContainer>
        {testimonials.map((t, idx) => (
          <Card
          key={idx}
          name={t.name}
          role={t.role}
          message={t.message}
          avatar={t.avatar}
          rating={t.rating}
          delay={idx * 200}
        />
        ))}
      </CardsContainer>
    </SectionWrapper>
  );
};

export default Testimonials;
