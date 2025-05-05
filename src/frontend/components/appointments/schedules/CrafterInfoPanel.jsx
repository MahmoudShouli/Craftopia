import React from "react";
import {
  LeftSection,
  CrafterName,
  CrafterEmail,
  CrafterCraft,
  Rating,
  StepIndicator,
  StepItem,
  ActiveStepIcon,
  InactiveStepIcon,
} from "./SchedulesPage.styled";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import UserAvatar from "../../../components/useravatar/UserAvatar";
import Button from "../../../components/button/Button"; 

const CrafterInfoPanel = ({ crafter, selectedDate, step, setCrafterForChat, setView }) => (
  <LeftSection>
    <UserAvatar
      previewUrl={crafter.avatarUrl}
      uploading={false}
      user={crafter}
      width={100}
      height={100}
    />
    <CrafterName>{crafter.name}</CrafterName>
    <CrafterEmail>{crafter.email}</CrafterEmail>
    <CrafterCraft>
      {crafter.craft} <Rating>⭐ {crafter.rating}</Rating>
    </CrafterCraft>

    <StepIndicator>
      <StepItem>
        {step >= 1 ? (
          <ActiveStepIcon><FaCalendarAlt /></ActiveStepIcon>
        ) : (
          <InactiveStepIcon><FaCalendarAlt /></InactiveStepIcon>
        )}
        {selectedDate && <span>{selectedDate.toDateString()}</span>}
      </StepItem>

      <StepItem>
        {step >= 2 ? (
          <ActiveStepIcon><FaClock /></ActiveStepIcon>
        ) : (
          <InactiveStepIcon><FaClock /></InactiveStepIcon>
        )}
      </StepItem>

      <StepItem>
        <Button
          text="Chat with the Crafter"
          size="medium"
          color="#6a380f"
          onClick={() => {
            setCrafterForChat(crafter);
            setView("Chatting");
          }} 
        />
      </StepItem>
    </StepIndicator>
  </LeftSection>
);

export default CrafterInfoPanel;
