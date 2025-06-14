import React, { useEffect, useState } from "react";
import { getUserLikedTemplates } from "../../../api/likeService"; // your existing function
import { getTemplatesByIds } from "../../../api/templateService";
import { useUser } from "../../../context/UserContext";
import TemplateItem from "../../templates/TemplateItem";

const LikedTemplates = () => {
  const { user } = useUser();
  const [likedTemplates, setLikedTemplates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLiked = async () => {
      if (!user?.email || user?.role !== "customer") return;

      try {
        const ids = await getUserLikedTemplates(user.email);
        if (!ids || ids.length === 0) {
          setLikedTemplates([]);
        } else {
          const templates = await getTemplatesByIds(ids);
          setLikedTemplates(templates);
        }
      } catch (err) {
        console.error("Error loading liked templates:", err);
        setLikedTemplates([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLiked();
  }, [user]);

  if (user?.role !== "customer") return null;

  return (
    <div style={{ padding: "1rem", maxWidth: "1100px", margin: "0 auto" }}>
      <h2 style={{ textAlign: "center", marginBottom: "1rem" }}>
        Liked Templates
      </h2>

      {loading ? (
        <p style={{ textAlign: "center" }}>Loading...</p>
      ) : likedTemplates.length === 0 ? (
        <p style={{ textAlign: "center", color: "gray" }}>
          You haven’t liked any templates yet.
        </p>
      ) : (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)", // ✅ Two columns
            gap: "1.5rem",
            justifyItems: "center",
            maxHeight: "600px",
            overflowY: "auto",
            paddingRight: "0.5rem",
          }}
        >
          {likedTemplates.map((template) => (
            <TemplateItem key={template._id} template={template} />
          ))}
        </div>
      )}
    </div>
  );
};

export default LikedTemplates;
