import React, { useState } from "react";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  LeftSection,
  MiddleSection,
  RightSection,
  CrafterName,
  CrafterEmail,
  CrafterCraft,
  Rating,
  StepIndicator,
  StepItem,
  ActiveStepIcon,
  InactiveStepIcon,
  AppointmentsList
} from "./SchedulesPage.styled";

import BookingCalendar from "../calendar/BookingCalendar";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import UserAvatar from "../../../components/useravatar/UserAvatar";
import AppointmentItem from "./AppointmentItem"; 

const SchedulesPage = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState([]);

  const crafter = {
    avatarUrl: "https://i.pravatar.cc/100",
    name: "Ali Osman",
    email: "ali@example.com",
    craft: "Woodwork",
    rating: 4.8,
  };

  const handleConfirm = (date) => {
    setStep(2);
    setAppointments((prev) => [...prev, { date, status: "Confirmed" , crafterName: crafter.name, }]);
  };

  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        {/* LEFT SECTION */}
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
              {step >= 3 ? (
                <ActiveStepIcon><FaUser /></ActiveStepIcon>
              ) : (
                <InactiveStepIcon><FaUser /></InactiveStepIcon>
              )}
            </StepItem>
          </StepIndicator>
        </LeftSection>

        {/* MIDDLE SECTION */}
        <MiddleSection>
          <BookingCalendar
            onDateChange={(date) => {
              setSelectedDate(date);
              setStep(1); // reset to step 1 on new date
            }}
            onConfirm={() => {
              if (selectedDate) handleConfirm(selectedDate);
            }}
            disabledDates={appointments.map(a => new Date(a.date))}
          />
        </MiddleSection>

        {/* RIGHT SECTION */}
        <RightSection>
          <h3 style={{ marginBottom: "1rem" }}>Your Appointments</h3>
          <AppointmentsList>
          {[...appointments]
            .sort((a, b) => new Date(a.date) - new Date(b.date))
            .map((app, index) => (
                <AppointmentItem
                key={index}
                date={app.date}
                status={app.status}
                crafterName={app.crafterName}
                />
            ))}
          </AppointmentsList>
        </RightSection>
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default SchedulesPage;
