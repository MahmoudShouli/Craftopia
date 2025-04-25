import React, { useState } from "react";
import { BoxWrapper, Label, TextArea } from "./ReviewBox.styled";
import StarRating from "../starrating/StarRating";
import Button from "../button/Button";
import { addReview } from "../../api/reviewService";
import { deleteAppointment } from "../../api/appointmentService";
import { toast } from "react-toastify";

const ReviewBox = ({ userEmail, crafterEmail, appointmentId, onSuccess }) => {
  const [message, setMessage] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmit = async () => {
    if (!message.trim()) {
      toast.error("❗ Please write a review message.");
      return;
    }
    if (rating === 0) {
      toast.error("❗ Please select a star rating.");
      return;
    }

    try {
      // ✅ Submit the review
      await addReview({
        email: userEmail,
        rating,
        message,
        type: "Person",
        to: crafterEmail,
      });

      // ✅ Try deleting the appointment (ignore if already deleted)
      try {
        await deleteAppointment(appointmentId);
      } catch (deleteError) {
        console.warn("Appointment already deleted or not found:", deleteError.response?.data?.error);
        // No crash, just log
      }

      // ✅ Show success toast safely after render
      setTimeout(() => {
        toast.success("⭐ Thank you for your review!");
      }, 0);

      // ✅ Reset form
      setMessage("");
      setRating(0);

      // ✅ Remove appointment from UI
      onSuccess?.(appointmentId);

    } catch (error) {
      console.error("❌ Full error:", error.response?.data || error.message);
      toast.error(error.response?.data?.error || "❌ Failed to submit review.");
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
