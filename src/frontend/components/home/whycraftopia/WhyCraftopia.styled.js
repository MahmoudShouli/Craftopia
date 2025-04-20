import styled from "styled-components";

export const SectionWrapper = styled.section`
  padding: 6rem 2rem;
  background-color: #ffffff; /* ✅ white background */
`;

export const SectionTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: 650;
  color: #6a380f;
  text-align: center;
  margin-bottom: 9rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const ContentWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 3rem;
`;

export const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  width: 650px;
  text-align: center;
`;

export const FeatureCard = styled.div`
  background: #f7e9d7;
  border-radius: 20px;
  padding: 1.5rem;
  box-shadow: 0 4px 14px rgba(0, 0, 0, 0.08);
  transition: border 0.3s ease;
  color: #6a380f;
  text-align: center;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #6a380f;
  }
`;

export const IconCircle = styled.div`
  width: 50px;
  height: 50px;
  background-color: #6a380f;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.4rem;
  margin: 0 auto 1rem auto;
`;

export const FeatureTitle = styled.h3`
  font-size: 1.3rem;
  color: #6a380f;
  font-weight: 700;
  margin-bottom: 0.5rem;
  text-align: center;
`;

export const FeatureDescription = styled.p`
  font-size: 1rem;
  color: #6a380f;
  font-weight: 600;
  text-align: center;
`;

export const ImageContainer = styled.div`
  flex: 1;
  display: flex;
  justify-content: flex-end;
`;

export const ImageWrapper = styled.div`
  width: 500px;
  height: 600px;
  background-color: #f7e9d7;
  border-top-left-radius: 500px;
  border-bottom-left-radius: 500px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
  transform: translateY(-40px);
`;

export const StyledImage = styled.img`
  width: 100%;
  height: auto;
  object-fit: contain;
  background-color: transparent;
`;
