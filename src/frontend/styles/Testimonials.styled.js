import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #f7e9d7;
  text-align: center;
`;

export const SectionTitle = styled.h2`
  font-size: 2.5rem;
  font-weight: bold;
  color: #6a380f;
  margin-bottom: 3rem;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 2rem;
`;

export const CardWrapper = styled.div`
  background: #ffffff;
  padding: 2rem;
  border-radius: 16px;
  width: 300px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
  transition: transform 0.3s ease;
  text-align: center;

  &:hover {
    transform: translateY(-10px);
  }
`;

export const Avatar = styled.div`
  width: 60px;
  height: 60px;
  background-color: #6a380f;
  color: white;
  font-weight: bold;
  font-size: 1.5rem;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1rem auto;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const Stars = styled.div`
  margin-bottom: 1rem;
`;

export const Star = styled.span`
  color: gold;
  font-size: 1.1rem;
  margin: 0 1px;
`;

export const Message = styled.p`
  font-size: 1rem;
  color: #444;
  font-style: italic;
`;

export const Name = styled.h3`
  color: #6a380f;
  font-weight: bold;
  font-size: 1.2rem;
  margin-top: 1rem;
`;

export const Role = styled.p`
  font-size: 0.95rem;
  color: #999;
  margin-top: 0.3rem;
`;
