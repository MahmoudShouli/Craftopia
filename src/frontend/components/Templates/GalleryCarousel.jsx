import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import {
  CarouselWrapper,
  SlidesContainer,
  Slide,
  SlideImage,
  PrevArrow,
  NextArrow,
  DotsWrapper,
  Dot,
} from "./CrafterTemplates.styled";

const GalleryCarousel = ({ images }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const nextSlide = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToSlide = (index) => {
    setActiveIndex(index);
  };

  return (
    <CarouselWrapper>
      <SlidesContainer $activeIndex={activeIndex}>
        {images.map((img, idx) => (
          <Slide key={idx}>
            <SlideImage src={img} alt={`Gallery ${idx + 1}`} />
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
        {images.map((_, idx) => (
          <Dot key={idx} $active={idx === activeIndex} onClick={() => goToSlide(idx)} />
        ))}
      </DotsWrapper>
    </CarouselWrapper>
  );
};

export default GalleryCarousel;
