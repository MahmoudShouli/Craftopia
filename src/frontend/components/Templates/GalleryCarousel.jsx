import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight, FaTimesCircle } from "react-icons/fa";
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

const GalleryCarousel = ({ images, onImageRemove }) => {
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
          <Slide key={idx} style={{ position: "relative" }}>
            <SlideImage src={img} alt={`Gallery ${idx + 1}`} />
            {onImageRemove && (
              <FaTimesCircle
                style={{
                  position: "absolute",
                  top: "10px",
                  right: "10px",
                  color: "red",
                  fontSize: "24px",
                  cursor: "pointer",
                  backgroundColor: "white",
                  borderRadius: "50%",
                }}
                onClick={() => onImageRemove(idx)}
              />
            )}
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
