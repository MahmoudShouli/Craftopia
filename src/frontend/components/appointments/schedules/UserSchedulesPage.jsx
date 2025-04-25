import React, { useState, useEffect } from "react";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  MiddleSection
} from "./SchedulesPage.styled";

import { useUser } from "../../../context/UserContext";
import {
  createAppointment,
  getAppointmentsByEmail
} from "../../../api/appointmentService";
import { getUserByEmail } from "../../../api/userService";

import CrafterInfoPanel from "./CrafterInfoPanel";
import BookingSection from "./BookingSection";
import AppointmentsPanel from "./AppointmentsPanel";

const UserSchedulesPage = ({ crafter }) => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [appointments, setAppointments] = useState([]);
  const [disabledDates, setDisabledDates] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const userAppointments = await getAppointmentsByEmail(user.email, "user");
        const crafterMap = {};
        const enriched = await Promise.all(
          userAppointments.map(async (app) => {
            if (!crafterMap[app.crafterEmail]) {
              try {
                const fetchedCrafter = await getUserByEmail(app.crafterEmail);
                crafterMap[app.crafterEmail] = fetchedCrafter.name;
              } catch {
                crafterMap[app.crafterEmail] = "Unknown";
              }
            }
            return { ...app, crafterName: crafterMap[app.crafterEmail], id: app._id };
          })
        );
        setAppointments(enriched);

        if (crafter) {
          const crafterAppointments = await getAppointmentsByEmail(crafter.email, "crafter");
          const dates = crafterAppointments.map((a) => new Date(a.date));
          setDisabledDates(dates);
        }
      } catch (err) {
        console.error("❌ Failed to fetch appointments:", err);
      }
    };

    fetchAppointments();
  }, [user.email, crafter?.email]);

  const handleConfirm = async (date) => {
    try {
      const newApp = await createAppointment({
        userEmail: user.email,
        crafterEmail: crafter.email,
        date
      });

      setStep(2);
      setAppointments((prev) => [
        ...prev,
        {
          ...newApp,
          id: newApp._id,
          crafterName: crafter.name
        }
      ]);
      setDisabledDates((prev) => [...prev, new Date(newApp.date)]);
    } catch (error) {
      console.error("❌ Failed to create appointment:", error);
    }
  };

  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        {crafter ? (
          <>
            <CrafterInfoPanel crafter={crafter} selectedDate={selectedDate} step={step} />
            <BookingSection
              selectedDate={selectedDate}
              setSelectedDate={(date) => {
                setSelectedDate(date);
                setStep(1);
              }}
              onConfirm={handleConfirm}
              disabledDates={disabledDates}
            />
            <AppointmentsPanel
              appointments={appointments}
              onDelete={(id) => {
                setAppointments((prev) => prev.filter((app) => app.id !== id));
              }}
            />
          </>
        ) : (
          <MiddleSection style={{ alignItems: "flex-start" }}>
            <AppointmentsPanel
              appointments={appointments}
              userEmail={user.email}
              onDelete={(id) => {
                setAppointments((prev) => prev.filter((app) => app.id !== id));
              }}
            />
          </MiddleSection>
        )}
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default UserSchedulesPage;
