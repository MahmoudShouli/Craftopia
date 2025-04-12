import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import bg1 from '../assets/bg1.png';
import bg2 from '../assets/bg2.png';
import bg3 from '../assets/bg3.png';

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

const CarouselWrapper = styled.div`
  width: 100%;
  height: 100vh; /* Full screen height */
  overflow: hidden;
  position: relative;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const SlidesContainer = styled.div`
  display: flex;
  width: ${({ count }) => `${count * 100}vw`};
  transform: ${({ activeIndex }) => `translateX(-${activeIndex * 100}vw)`};
  transition: transform 1s ease-in-out;
`;

const Slide = styled.div`
  flex: 0 0 100vw;
  height: 100vh;
  background: url(${({ bg }) => bg}) center center/cover no-repeat;
  position: relative;
  display: flex;
  justify-content: ${({ position }) =>
    position === 'top-left' ? 'flex-start' : 'center'};
  align-items: ${({ position }) =>
    position === 'top-left' ? 'flex-start' : 'flex-end'};
  text-align: ${({ position }) => (position === 'top-left' ? 'left' : 'center')};
  padding: 4rem;
  box-sizing: border-box;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0);
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: bold;
  color: white;
  text-shadow: 1px 1px 4px rgba(0, 0, 0, 0.7);
`;

const Subtitle = styled.p`
  font-size: 1.3rem;
  color: white;
  margin: 1rem 0 2rem 0;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
`;

const HeroButton = styled.a`
  background-color: #6a380f;
  color: white;
  text-decoration: none;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  border-radius: 10px;
  transition: background-color 0.2s;

  &:hover {
    background-color: #5c320d;
  }
`;

const ArrowButton = styled.button`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  color: white;
  font-size: 2rem;
  border: none;
  cursor: pointer;
  z-index: 10;
  padding: 0.5rem;

  &:hover {
    color: #ddd;
  }
`;

const PrevArrow = styled(ArrowButton)`
  left: 20px;
`;

const NextArrow = styled(ArrowButton)`
  right: 20px;
`;

const DotsWrapper = styled.div`
  position: absolute;
  bottom: 25px;
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
`;

const Dot = styled.button`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${({ active }) => (active ? '#6a380f' : '#ccc')};
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #6a380f;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: ${({ position }) =>
    position === 'top-left' ? 'flex-start' : 'center'};
  justify-content: center;
  max-width: 800px;
  width: 100%;
  gap: 1rem;
`;

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
      <SlidesContainer count={slideCount} activeIndex={activeIndex}>
        {slides.map((slide, idx) => (
          <Slide key={idx} bg={slide.bg} position={slide.position}>
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
          <Dot key={idx} active={idx === activeIndex} onClick={() => goToSlide(idx)} />
        ))}
      </DotsWrapper>
    </CarouselWrapper>
  );
};

export default HeroCarousel;
