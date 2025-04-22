import styled from "styled-components";

export const SchedulesCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  min-height: 700px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`;
export const SchedulesInnerWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 650px;
  gap: 2rem;
  justify-content: center;
  align-items: center;
`;

export const LeftSection = styled.div`
  flex: 1;
  max-width: 250px;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const CrafterAvatar = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 1rem;
`;

export const CrafterName = styled.h2`
  font-size: 1.25rem;
  margin: 0.2rem 0;
`;

export const CrafterEmail = styled.p`
  font-size: 0.85rem;
  color: #6b7280;
  margin-bottom: 0.5rem;
`;

export const CrafterCraft = styled.div`
  font-size: 1rem;
  font-weight: 500;
  margin-bottom: 2rem;
`;

export const Rating = styled.span`
  font-size: 0.9rem;
  color: #f59e0b;
  margin-left: 0.5rem;
`;

export const StepIndicator = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  margin-top: 10rem;
`;

export const StepItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 0.9rem;
  color: #374151;
`;

export const ActiveStepIcon = styled.div`
  color: #6a380f;
  font-size: 1.5rem;
`;

export const InactiveStepIcon = styled.div`
  color: #d1d5db;
  font-size: 1.5rem;
`;

export const MiddleSection = styled.div`
  flex: 2;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const RightSection = styled.div`
  flex: 1;
  max-width: 300px;
  height: 100%;
  background-color: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const AppointmentsList = styled.ul`
  list-style: none;
  margin-top: 1rem;
  padding: 0;
  font-size: 0.95rem;

  li {
    margin-bottom: 0.5rem;
    padding: 0.4rem 0.6rem;
    border-radius: 6px;
    background-color: #f3f4f6;
  }
`;

export const AppointmentCard = styled.div`
  display: flex;
  align-items: flex-start;
  background-color: #6a380f;
  border-radius: 10px;
  padding: 0.75rem 1rem;
  margin-bottom: 1rem;
  color: white;
`;

export const AppointmentDate = styled.div`
  font-weight: 600;
  font-size: 0.95rem;
`;

export const AppointmentStatus = styled.div`
  font-size: 0.8rem;
  margin-top: 0.25rem;

  &.confirmed {
    color: #d1fae5; /* soft green */
  }

  &.pending {
    color: #fde68a; /* yellow */
  }

  &.canceled {
    color: #fecaca; /* red */
  }
`;

export const AppointmentCrafter = styled.div`
  font-weight: 700;
  font-size: 1rem;
  margin-bottom: 0.25rem;
  color: white;
`;
