// ✅ Updated CrafterSchedulesPage.jsx with deferred cancellation
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  LeftSection,
  RightSection,
} from "./CrafterSchedulesPage.styled";

import BookingCalendar from "../../calendar/BookingCalendar";
import AppointmentItem from "../AppointmentItem"; 
import Modal from "../../../modals/Modal";
import Button from "../../../button/Button";
import {
  createAppointment,
  getDisabledDates,
  getAppointmentsByEmail,
  deleteAppointment,
} from "../../../../api/appointmentService";
import messageService from "../../../../api/messageService";
import { CANCELLATION_REASONS } from "../../../../constants/cancellationReasons";
import { useUser } from "../../../../context/UserContext";

const CrafterSchedulesPage = () => {
  const { user } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [disabledDates, setDisabledDates] = useState([]);
  const [calendarBlockedDates, setCalendarBlockedDates] = useState([]);
  const [appointments, setAppointments] = useState([]);

  const [showReasonModal, setShowReasonModal] = useState(false);
  const [appointmentToCancel, setAppointmentToCancel] = useState(null);
  const [selectedReason, setSelectedReason] = useState("");

  const loadCalendarData = async () => {
    try {
      const disabled = await getDisabledDates(user.email);
      const appts = await getAppointmentsByEmail(user.email, "crafter");

      const appointmentDates = appts.map((a) => new Date(a.date));
      const disabledConverted = disabled.map((d) => new Date(d));
      const allBlocked = [...appointmentDates, ...disabledConverted];

      setDisabledDates(disabledConverted);
      setCalendarBlockedDates(allBlocked);
      setAppointments(appts);
    } catch (err) {
      toast.error("Failed to load calendar data");
    }
  };

  useEffect(() => {
    if (user?.email) loadCalendarData();
  }, [user]);

  const handleDisableToggle = async (date) => {
    const isDisabled = disabledDates.some(
      (d) => d.toDateString() === date.toDateString()
    );

    if (isDisabled) {
      toast.info(`${date.toDateString()} is already disabled.`);
      return;
    }

    try {
      await createAppointment({
        userEmail: "system",
        crafterEmail: user.email,
        date: date.toISOString(),
      });
      toast.success(`Disabled ${date.toDateString()}`);
      await loadCalendarData();
    } catch (err) {
      toast.error("Failed to disable date");
    }
  };

  const handleCancelRequest = ({ id, date, userEmail }) => {
    setAppointmentToCancel({ _id: id, date, userEmail });
    setShowReasonModal(true);
  };

  const confirmCancellation = async () => {
    if (!appointmentToCancel || !selectedReason) return;

    try {
      await deleteAppointment(appointmentToCancel._id, "crafter");

      await messageService.sendMessage({
        sender: user.email,
        receiver: appointmentToCancel.userEmail,
        content: `Your appointment on ${new Date(
          appointmentToCancel.date
        ).toLocaleDateString()} was canceled by the crafter. Reason: ${selectedReason}.`,
      });

      toast.success("Appointment canceled and user notified.");
      setAppointments((prev) => prev.filter((a) => a._id !== appointmentToCancel._id));
      setShowReasonModal(false);
      setSelectedReason("");
    } catch (err) {
      toast.error("Failed to cancel appointment.");
    }
  };

  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        <LeftSection>
          <BookingCalendar
            mode="crafter"
            onDateChange={setSelectedDate}
            onDisableDate={handleDisableToggle}
            disabledDates={calendarBlockedDates}
          />
        </LeftSection>
        <RightSection>
          <h2 style={{ textAlign: "center", marginBottom: "10px" }}>State</h2>
          {appointments.length === 0 ? (
            <p>No appointments yet.</p>
          ) : (
            appointments.map((a) => (
              <AppointmentItem
                key={a._id}
                id={a._id}
                date={a.date}
                status={a.status}
                onDelete={handleCancelRequest}
                showBookedByName={true}
                bookedByName={a.userName || a.userEmail}
                userEmail={a.userEmail}
                crafterEmail={a.crafterEmail}
                isCrafter={true}
              />
            ))
          )}
        </RightSection>

        {showReasonModal && (
          <Modal onClose={() => setShowReasonModal(false)}>
            <h3>Select cancellation reason:</h3>
            {CANCELLATION_REASONS.map((reason) => (
              <div key={reason} style={{ marginBottom: "0.5rem" }}>
                <input
                  type="radio"
                  name="reason"
                  id={reason}
                  value={reason}
                  onChange={() => setSelectedReason(reason)}
                  checked={selectedReason === reason}
                />
                <label htmlFor={reason} style={{ marginLeft: "0.5rem" }}>{reason}</label>
              </div>
            ))}

            <Button
              text="Confirm Cancel"
              onClick={confirmCancellation}
              disabled={!selectedReason}
              size="medium"
              color="#a00"
            />
          </Modal>
        )}
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default CrafterSchedulesPage;
