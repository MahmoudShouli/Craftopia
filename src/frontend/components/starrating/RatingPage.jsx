import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RatingCard, LeftSection, RightSection } from "./RatingPage.styled";
import CrafterInfoPanel from "../appointments/schedules/CrafterInfoPanel";
import { getReviewsByEmail } from "../../api/reviewService"; // adjust the path if needed
import ReviewCard from "../home/testimonials/ReviewCard"; // adjust the path if needed

const RatingPage = ({ crafter }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByEmail(crafter.email); // Fetch by crafter's email
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch reviews");
      }
    };

    if (crafter?.email) {
      fetchReviews();
    }
  }, [crafter]); // Re-fetch when crafter changes

  return (
    <RatingCard>
      <LeftSection>
        <CrafterInfoPanel
          crafter={crafter}
          selectedDate={selectedDate}
          step={step}
        />
      </LeftSection>

      <RightSection>
        <h3 style={{ marginBottom: "1rem" }}>Reviews</h3>

        {reviews.length > 0 ? (
          reviews.map((review, i) => (
            <div key={i} style={{ marginBottom: "1rem" }}>
            <ReviewCard
                name={review.user?.name}
                role={review.user?.role}
                message={review.message}
                avatar={review.user?.avatarUrl}
                rating={review.rating}
                delay={i * 100}
                backgroundColor="#f7e9d7" // soft brown bg
                layout="horizontal"       // switch to horizontal layout
                />
                </div>
          ))
        ) : (
          <p>No reviews yet for this crafter.</p>
        )}
      </RightSection>
    </RatingCard>
  );
};

export default RatingPage;
