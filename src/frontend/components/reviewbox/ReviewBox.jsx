import React, { useState } from "react";
import { BoxWrapper, Label, TextArea } from "./ReviewBox.styled";
import StarRating from "../starrating/StarRating";
import Button from "../button/Button"; 
import { addReview } from "../../api/reviewService";
import { deleteAppointment } from "../../api/appointmentService";

const ReviewBox = ({ onSubmit }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    if (!message.trim() || rating === 0) {
      alert("Please provide both a message and a star rating.");
      return;
    }
  
    try {
      // 1. Add the review
      await addReview({
        email: userEmail,
        rating,
        message,
        type: "Person",
        to: crafterEmail,
      });
  
      // 2. Delete the appointment
      await deleteAppointment(appointmentId);
  
      alert("⭐ Review submitted and appointment deleted!");
  
      // 3. Reset the form
      setMessage("");
      setRating(0);
  
      // 4. Trigger frontend removal (UI update)
      onSuccess?.(appointmentId);
    } catch (error) {
      console.error("❌ Failed during review submit or appointment delete:", error);
      alert("Failed to submit review or delete appointment. Please try again later.");
    }
  };

  return (
    <BoxWrapper>
      <Label>Write a review:</Label>
      <TextArea
        rows="4"
        placeholder="Tell us about your experience..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <Label>Your Rating:</Label>
      <StarRating rating={rating} onRatingChange={setRating} />

      <Button text="Submit Review" size="medium" onClick={handleSubmit} />
    </BoxWrapper>
  );
};

export default ReviewBox;
