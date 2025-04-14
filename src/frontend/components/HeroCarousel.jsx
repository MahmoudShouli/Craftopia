import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg2.png';
import bg3 from '../assets/bg3.png';
import {
  CarouselWrapper,
  SlidesContainer,
  Slide,
  Title,
  Subtitle,
  HeroButton,
  ArrowButton,
  PrevArrow,
  NextArrow,
  DotsWrapper,
  Dot,
  Content
} from '../styles/HeroCarousel.styled';

const slides = [
  {
    title: 'Skilled Hands, Crafted Excellence',
    subtitle: 'Connect with top-tier professionals...',
    button: 'Explore Now',
    link: '/signup',
    bg: bg1,
    position: 'bottom-center',
  },
  {
    title: 'Bring Your Vision to Life',
    subtitle: 'Collaborate with creative experts...',
    bg: bg2,
    position: 'bottom-center',
  },
  {
    title: 'Crafters Just a Message Away',
    subtitle: 'Chat directly with verified craftsmen...',
    bg: bg3,
    position: 'top-left',
    offset: '100px',
  },
];

const HeroCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const slideCount = slides.length;

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === slideCount - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [activeIndex]);

  return (
    <CarouselWrapper>
      <SlidesContainer $count={slideCount} $activeIndex={activeIndex}>
        {slides.map((slide, idx) => (
          <Slide
          key={idx}
          $bg={slide.bg}        // ✅ changed
          $position={slide.position}  // ✅ changed
        >
          <Content style={{ marginTop: slide.offset || '0px' }}>
            <Title>{slide.title}</Title>
            <Subtitle>{slide.subtitle}</Subtitle>
            {slide.button && <HeroButton href={slide.link}>{slide.button}</HeroButton>}
          </Content>
        </Slide>
        ))}
      </SlidesContainer>

      <PrevArrow onClick={prevSlide}>
        <FaChevronLeft />
      </PrevArrow>
      <NextArrow onClick={nextSlide}>
        <FaChevronRight />
      </NextArrow>

      <DotsWrapper>
        {slides.map((_, idx) => (
          <Dot key={idx} $active={idx === activeIndex} onClick={() => goToSlide(idx)} />
        ))}
      </DotsWrapper>
    </CarouselWrapper>
  );
};

export default HeroCarousel;
