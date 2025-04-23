import React, { useState, useEffect } from "react";
import {
  SchedulesCard,
  SchedulesInnerWrapper,
  LeftSection,
  RightSection,
} from "./CrafterSchedulesPage.styled";
import BookingCalendar from '../../calendar/BookingCalendar';

const CrafterSchedulesPage = () => {
  return (
    <SchedulesCard>
      <SchedulesInnerWrapper>
        <LeftSection>
          <BookingCalendar
            onDateChange={(date) => setSelectedDate(date)}
            onConfirm={() => toast.success(`Confirmed for ${selectedDate?.toDateString()}`)}
          />
        </LeftSection>
        <RightSection>
          {/* This can display more details or appointments */}
        </RightSection>
      </SchedulesInnerWrapper>
    </SchedulesCard>
  );
};

export default CrafterSchedulesPage;


