import styled from "styled-components";
import { motion } from "framer-motion";

export const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #fff8f1;
`;

export const SectionTitle = styled(motion.h2)`
  font-size: 3.5rem;
  font-weight: 650;
  color: #6a380f;
  text-align: center;
  margin-bottom: 5rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const CardsContainer = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

export const CardWrapper = styled(motion.div)`
  background-color: #fff;
  border-radius: 20px;
  padding: 1.5rem;
  width: 100%;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  color: #6a380f;
  text-align: center;
  border: 2px solid transparent;
  transition: border 0.3s ease;

  &:hover {
    border: 2px solid #6a380f;
  }
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: #6a380f;
  color: white;
  border-radius: 50%;
  font-size: 1.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
`;

export const Name = styled.h3`
  font-size: 1.2rem;
  font-weight: 700;
  margin: 0.5rem 0;
`;

export const Role = styled.p`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const Message = styled.p`
  font-size: 0.95rem;
  font-weight: 500;
  line-height: 1.4;
`;

export const Rating = styled.div`
  font-size: 1.2rem;
  color: #ffcc00;
  margin-top: 0.5rem;
`;

export const Viewport = styled.div`
  overflow: hidden;
  width: 100%;
  position: relative;
  padding: 0 3rem;
  box-sizing: border-box;
  margin-top: 2rem;
`;

export const ScrollWrapper = styled.div`
  display: flex;
  transition: transform 0.5s ease;
  transform: translateX(${({ $offset }) => `-${$offset * 100}%`});
`;

export const CardRow = styled.div`
  display: flex;
  width: ${({ $total }) => `calc(100% * ${$total / 4})`};
  gap: 1rem;
  padding: 0 3.5rem;
  box-sizing: border-box;
`;

export const CardItem = styled.div`
  flex: 0 0 calc((100% - 3rem) / 4);
`;

export const ArrowButton = styled.button`
  position: absolute;
  top: calc(50% + 20px);
  transform: translateY(-50%);
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 0.6rem 0.9rem;
  font-size: 1.2rem;
  border-radius: 50%;
  cursor: pointer;
  z-index: 2;

  &:hover {
    background-color: #5c320d;
  }
`;

export const LeftArrow = styled(ArrowButton)`
  left: 0;
`;

export const RightArrow = styled(ArrowButton)`
  right: 0;
`;
