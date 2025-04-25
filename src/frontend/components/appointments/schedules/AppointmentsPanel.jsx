import React from "react";
import { RightSection, AppointmentsList } from "./SchedulesPage.styled";
import AppointmentItem from "./AppointmentItem";

const AppointmentsPanel = ({ appointments, userEmail, onDelete }) => (
  <RightSection>
    <h3 style={{ marginBottom: "1rem" }}>Your Appointments</h3>
    <AppointmentsList>
      {[...appointments]
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .map((app, index) => (
          <AppointmentItem
            key={index}
            id={app._id || app.id}
            date={app.date}
            status={app.status}
            crafterName={app.crafterName}     
            crafterEmail={app.crafterEmail}
            userEmail={userEmail}
            isCrafter={false}
            showBookedByName={true}             
            bookedByName={app.crafterName}       
            onDelete={onDelete}
          />
        ))}
    </AppointmentsList>
  </RightSection>
);

export default AppointmentsPanel;
