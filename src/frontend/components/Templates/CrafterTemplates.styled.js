import styled from "styled-components";
import { FaHeart } from "react-icons/fa";

/* Main Card for Templates List */
export const TemplateCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

export const TopSection = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 2rem;
`;

export const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #6a380f;
`;

export const AddButtonWrapper = styled.div`
  position: absolute;
  right: 0;
`;

/* Template Item */
export const TemplatesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  padding-left: 2rem;
  padding-top: 2rem;
  padding-bottom: 2rem;
  margin-top: 5rem;
  width: 100%;
  margin-top: 20px;
  overflow-y: auto;

  @media (max-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a380f;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f9f5f2;
  }
`;

export const SingleTemplateCard = styled.div`
  position: relative;
  background-color: #fff;
  border: 2px solid #6a380f;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
  width: 250px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  transition: 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
  }
`;

export const TemplateAvatarWrapper = styled.div`
  margin-bottom: 1rem;
`;

export const TemplateName = styled.h3`
  font-size: 1.1rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.5rem;
`;

export const CrafterName = styled.p`
  font-size: 1rem;
  color: #777;
  margin-top: 1rem;
`;

export const CraftName = styled.p`
  font-size: 1rem;
  color: black;
`;

/* Template Details Popup */
export const DetailsWrapper = styled.div`
  width: 85%;
  height: 90%;
  background-color: #f7e9d7;
  border-radius: 25px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  overflow-y: auto; /* <-- enable full scrolling */
  padding: 2rem;

  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #6a380f;
    border-radius: 3px;
  }
  &::-webkit-scrollbar-track {
    background-color: #f9f5f2;
  }
`;
export const TopContent = styled.div`
  display: flex;
  align-items: stretch;
  gap: 2rem;
`;

export const LeftSection = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const RightSection = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const BottomSection = styled.div`
  width: 100%;
  background-color: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  gap: 1rem;
  margin-top: 1rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
`;

export const FieldWrapper = styled.div`
  background-color: #ffffff;
  border: 2px solid #6a380f;
  border-radius: 12px;
  padding: 1rem;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const FieldGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  flex: 1;
`;

export const Label = styled.label`
  font-weight: bold;
  font-size: 1.2rem;
  color: #6a380f;
  width: 150px;
  text-align: center;
`;

export const StyledInput = styled.input`
  background-color: #f7e9d7;
  color: #6a380f;
  font-weight: 600;
  font-size: 1.1rem;
  border: none;
  padding: 0.75rem 1rem;
  border-radius: 8px;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #6a380f;
  }
`;

export const VerticalFieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const StyledTextarea = styled.textarea`
  background-color: white;
  color: #6a380f;
  font-weight: 600;
  font-size: 1.1rem;
  border: 2px solid #6a380f;
  padding: 0.75rem 1rem;
  border-radius: 12px;
  flex: 1;
  width: 100%;
  min-height: 380px;
  max-height: 450px;
  resize: none;

  &:focus {
    outline: none;
    border-color: #6a380f;
  }
`;

/* Colors and Tags */
export const ColorsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.75rem;
`;

export const TagsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-top: 0.75rem;
`;

export const ColorDot = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: ${(props) => props.$color};
  margin-right: 10px;
  margin-bottom: 10px;
  position: relative;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.2);
  }
`;

export const Tag = styled.div`
  padding: 6px 12px;
  margin: 5px;
  border-radius: 20px;
  border: 1px solid #6a380f;
  background-color: white;
  color: #6a380f;
  text-align: center;
  font-weight: 500;
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
`;

/* Buttons and Inputs */
export const AddButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 30px;
  height: 30px;
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 0.3s;

  &:hover {
    background-color: #5a2f08;
  }
`;

export const StyledSmallInput = styled.input`
  background-color: #f7e9d7;
  border: 2px solid #6a380f;
  border-radius: 8px;
  padding: 0.5rem;
  font-size: 1rem;
  color: #6a380f;
  flex: 1;

  &:focus {
    outline: none;
    border-color: #6a380f;
  }
`;

export const RemoveIcon = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: white;
  color: red;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 1.3rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;
export const RemoveTagIcon = styled.div`
  position: absolute;
  top: -6px;
  right: -6px;
  background: white;
  color: red;
  border-radius: 50%;
  width: 18px;
  height: 18px;
  font-size: 1rem;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  z-index: 10;
`;

/* Carousel */
export const CarouselWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 500px;
  overflow: hidden;
  border-radius: 12px;
`;

export const SlidesContainer = styled.div`
  display: flex;
  transition: transform 0.5s ease-in-out;
  transform: translateX(${({ $activeIndex }) => `-${$activeIndex * 100}%`});
  width: 100%;
  height: 100%;
`;

export const Slide = styled.div`
  min-width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 20px;
`;

export const SlideImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  background-color: #fff;
`;

export const PrevArrow = styled.div`
  position: absolute;
  top: 50%;
  left: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  z-index: 2;
`;

export const NextArrow = styled.div`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.3);
  border-radius: 50%;
  padding: 0.5rem;
  cursor: pointer;
  color: white;
  z-index: 2;
`;

export const DotsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? "#6a380f" : "#ccc")};
  cursor: pointer;
`;
export const SaveButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 2rem;
`;
export const InfoTitle = styled.h3`
  font-size: 1.2rem;
  color: #6a380f;
  margin-bottom: 0.5rem;
  text-align: center;
`;
export const LikesWrapper = styled.div`
  margin-top: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const HeartIcon = styled(FaHeart)`
  color: red;
  font-size: 1.2rem;

  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.3);
  }
`;

export const BottomCardContent = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const DeleteIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  left: 8px; /* moved to left to avoid heart overlap */
  cursor: pointer;
  background: white;
  border-radius: 50%;
  padding: 4px;
  z-index: 10;

  &:hover {
    background: #eee;
  }
`;

export const HeartIconWrapper = styled.div`
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
  background: white;
  border-radius: 50%;
  padding: 5px;
  z-index: 10;

  &:hover {
    background: #fee;
  }
`;

export const ColorPickerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 1rem;
  gap: 0.5rem;
`;

export const PriceLabel = styled.div`
  margin-top: 1rem;
  font-size: 1.1rem;
  font-weight: 600;
  color: #6a380f;
`;

export const FloatingAIButton = styled.button`
  position: fixed;
  bottom: 30px;
  right: 30px;
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 50%;
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  font-size: 24px;
  cursor: pointer;
  z-index: 999;

  &:hover {
    background-color: #4a250a;
    transform: scale(1.1);
    transition: all 0.2s ease;
  }
`;
