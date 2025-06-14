import React, { useEffect, useState } from "react";
import { getReviewsByEmail } from "../../../api/reviewService";
import { getUserByEmail } from "../../../api/userService";
import UserAvatar from "../../useravatar/UserAvatar";

const CrafterReviews = ({ crafterEmail }) => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviewsWithAvatars = async () => {
      try {
        const raw = await getReviewsByEmail(crafterEmail);
        const filtered = raw.filter(
          (r) => r.to === crafterEmail && r.type === "Person"
        );

        // Fetch avatars and names in parallel
        const reviewsWithAvatars = await Promise.all(
          filtered.map(async (r) => {
            try {
              const user = await getUserByEmail(r.email);
              return {
                ...r,
                avatarUrl: user.avatarUrl || null,
                name: user.name || r.email,
              };
            } catch {
              return {
                ...r,
                avatarUrl: null,
                name: r.email,
              };
            }
          })
        );

        setReviews(reviewsWithAvatars);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };

    fetchReviewsWithAvatars();
  }, [crafterEmail]);

  return (
    <>
      {/* Scoped Scrollbar Style */}
      <style>{`
        .reviews-scroll::-webkit-scrollbar {
          width: 8px;
        }
        .reviews-scroll::-webkit-scrollbar-track {
          background: #f3e7d9;
          border-radius: 4px;
        }
        .reviews-scroll::-webkit-scrollbar-thumb {
          background-color: #6a380f;
          border-radius: 4px;
        }
      `}</style>

      <div
        className="reviews-scroll"
        style={{
          flex: 1,
          maxWidth: "500px",
          maxHeight: "600px",
          overflowY: "auto",
          paddingRight: "0.5rem",
        }}
      >
        <h2
          style={{
            color: "#6a380f",
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "1rem",
          }}
        >
          Your Reviews
        </h2>

        {reviews.length === 0 ? (
          <p style={{ color: "#999", textAlign: "center" }}>
            You have no reviews yet.
          </p>
        ) : (
          reviews.map((review) => (
            <div
              key={review._id}
              style={{
                border: "1px solid #6a380f",
                borderRadius: "10px",
                padding: "1rem",
                marginBottom: "1rem",
                background: "#fffaf3",
                textAlign: "center",
              }}
            >
              {/* Avatar */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: "0.5rem",
                }}
              >
                <UserAvatar
                  user={{ name: review.name }}
                  previewUrl={review.avatarUrl}
                  width={50}
                  height={50}
                />
              </div>

              {/* Name */}
              <p
                style={{
                  fontWeight: "bold",
                  color: "#6a380f",
                  marginBottom: "0.3rem",
                }}
              >
                {review.name}
              </p>

              {/* Rating */}
              <div style={{ marginBottom: "0.5rem" }}>
                {Array.from({ length: review.rating }).map((_, i) => (
                  <span
                    key={i}
                    style={{ color: "#6a380f", fontSize: "1.2rem" }}
                  >
                    ⭐
                  </span>
                ))}
              </div>

              {/* Message */}
              <p style={{ color: "#444", wordBreak: "break-word" }}>
                {review.message}
              </p>
            </div>
          ))
        )}
      </div>
    </>
  );
};

export default CrafterReviews;
