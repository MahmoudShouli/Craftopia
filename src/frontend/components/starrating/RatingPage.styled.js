import styled from "styled-components";

export const RatingCard = styled.div`
  width: 85%; /* fixed width */
  height: 80%; /* fixed height */
  background-color: #f7e9d7;
  border-radius: 25px; /* optional: rounded corners */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

  position: fixed; /* fixed position */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* perfect center */

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 15%;
  height: 95%;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RightSection = styled.div`
  flex: 1;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  height: 95%;
  max-width: 80%;
  overflow-y: auto;
  /* Scrollbar styles */
  scrollbar-width: thin;
  scrollbar-color: #6a380f #f5f5f5; /* thumb color, track color */

  /* Chrome, Edge, Safari */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #6a380f;
    border-radius: 4px;
    border: 2px solid #f5f5f5;
  }
`;
