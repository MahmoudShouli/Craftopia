import React, { useState, useEffect } from "react";
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
  AppointmentsList,
} from "./SchedulesPage.styled";

import BookingCalendar from "../calendar/BookingCalendar";
import { FaCalendarAlt, FaClock, FaUser } from "react-icons/fa";
import UserAvatar from "../../../components/useravatar/UserAvatar";
import AppointmentItem from "./AppointmentItem";
import { useUser } from "../../../context/UserContext";
import {
  createAppointment,
  getAppointmentsByEmail,
} from "../../../api/appointmentService";

const SchedulesPage = ({ crafter }) => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState([]);

  if (!crafter) {
    return <p style={{ padding: "2rem" }}>No crafter selected.</p>;
  }

  // ✅ Fetch appointments on load
  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const data = await getAppointmentsByEmail(user.email);
        setAppointments(data); // ✅ keep ALL user appointments
      } catch (err) {
        console.error("❌ Failed to fetch appointments:", err);
      }
    };
  
    fetchAppointments();
  }, [user.email]);

  const handleConfirm = async (date) => {
    try {
      const newApp = await createAppointment({
        userEmail: user.email,
        crafterEmail: crafter.email,
        date,
      });

      setStep(2);
      setAppointments((prev) => [...prev, newApp]);
    } catch (error) {
      console.error("❌ Failed to create appointment:", error);
    }
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
                <ActiveStepIcon>
                  <FaCalendarAlt />
                </ActiveStepIcon>
              ) : (
                <InactiveStepIcon>
                  <FaCalendarAlt />
                </InactiveStepIcon>
              )}
              {selectedDate && <span>{selectedDate.toDateString()}</span>}
            </StepItem>

            <StepItem>
              {step >= 2 ? (
                <ActiveStepIcon>
                  <FaClock />
                </ActiveStepIcon>
              ) : (
                <InactiveStepIcon>
                  <FaClock />
                </InactiveStepIcon>
              )}
            </StepItem>

            <StepItem>
              {step >= 3 ? (
                <ActiveStepIcon>
                  <FaUser />
                </ActiveStepIcon>
              ) : (
                <InactiveStepIcon>
                  <FaUser />
                </InactiveStepIcon>
              )}
            </StepItem>
          </StepIndicator>
        </LeftSection>

        {/* MIDDLE SECTION */}
        <MiddleSection>
        <BookingCalendar
            onDateChange={(date) => {
              setSelectedDate(date);
              setStep(1);
            }}
            onConfirm={() => {
              if (selectedDate) handleConfirm(selectedDate);
            }}
            disabledDates={appointments
              .filter((a) => a.crafterEmail === crafter.email)
              .map((a) => new Date(a.date))}
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
                  crafterName={app.crafterName || crafter.name}
                />
              ))}
          </AppointmentsList>
        </RightSection>
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default SchedulesPage;
