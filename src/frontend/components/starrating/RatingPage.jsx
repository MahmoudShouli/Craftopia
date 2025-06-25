import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { RatingCard, LeftSection, RightSection } from "./RatingPage.styled";
import CrafterInfoPanel from "../appointments/schedules/CrafterInfoPanel";
import { getReviewsByEmail } from "../../api/reviewService";
import ReviewCard from "../home/testimonials/ReviewCard";
import StatCard from "./StatCard";


const RatingPage = ({ crafter }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [step, setStep] = useState(1);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviewsByEmail(crafter.email);
        setReviews(data);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch reviews");
      }
    };

    if (crafter?.email) {
      fetchReviews();
    }
  }, [crafter]);

  const positiveCount = reviews.filter((r) => r.sentiment === "positive").length;
  const negativeCount = reviews.filter((r) => r.sentiment === "negative").length;

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

        {/* 🔹 Stat Summary Cards */}
       <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center", // ✅ centers the cards
            marginBottom: "2rem"
          }}
        >
          <StatCard icon="😊" count={positiveCount} bgColor="#6a380f" />
          <StatCard icon="🙁" count={negativeCount} bgColor="#a94438" />
        </div>

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
                backgroundColor="#f7e9d7"
                layout="horizontal"
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
