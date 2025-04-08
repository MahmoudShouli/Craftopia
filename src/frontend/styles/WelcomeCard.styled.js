import styled from "styled-components";
import brownBackground from "../assets/brown.png";

export const WelcomeContainer = styled.div`
  background-image: url(${brownBackground});
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 100vh;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  text-align: center;
`;

export const WelcomeHeading = styled.h2`
  font-size: 3rem;
  font-weight: 700;
  margin-bottom: 10rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const WelcomeSubtext = styled.p`
  font-size: 2rem;
  margin-bottom: 1rem;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

export const WelcomeButton = styled.button`
  background-color: #fff;
  color: #000;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 800;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  cursor: pointer;
`;
