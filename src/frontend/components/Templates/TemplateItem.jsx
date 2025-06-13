import React, { useState, useEffect } from "react";
import {
  SingleTemplateCard,
  TemplateAvatarWrapper,
  TemplateName,
  CrafterName,
  ColorsWrapper,
  CraftName,
  ColorDot,
  LikesWrapper,
  HeartIcon,
  DeleteIconWrapper,
  PriceLabel,
} from "./CrafterTemplates.styled";

import UserAvatar from "../useravatar/UserAvatar";
import PopUpPage from "../map/PopUpPage";
import TemplateDetails from "./TemplateDetails";
import { useUser } from "../../context/UserContext";
import { FaTimes } from "react-icons/fa";
import { toggleLike } from "../../api/likeService";
import { motion } from "framer-motion";
import notificationService from "../../api/notificationService";
import { socket } from "../../../utils/socket";

const TemplateItem = ({
  template,
  onEdit,
  onDelete,
  initiallyLiked = false,
  onLikeChange,
}) => {
  const { user } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const [liked, setLiked] = useState(initiallyLiked);
  const [localLikesCount, setLocalLikesCount] = useState(template.likes || 0);

  const isCrafter = user?.role === "crafter";
  const isUser = user?.role === "customer";

  useEffect(() => {
    setLiked(initiallyLiked);
  }, [initiallyLiked]);

  if (!template) return null;

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleSaveEdit = (updatedTemplate) => {
    if (onEdit) onEdit(updatedTemplate);
    setShowDetails(false);
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    try {
      await toggleLike(user.email, template._id);

      // Optimistically update local state
      const newLiked = !liked;
      setLiked(newLiked);
      setLocalLikesCount((prev) => prev + (newLiked ? 1 : -1));

      if (onLikeChange) {
        onLikeChange(template._id, newLiked);
      }

      if (!liked && template.crafterEmail !== user.email) {
          const notification = {
            text: `${user.name} liked your template "${template.name}"`,
            linkTo: "Templates",
            email: template.crafterEmail, // send to the crafter
          };

          await notificationService.createNotification(notification);
          socket.emit("notification", {
            to: template.crafterEmail,
            notification,
          });
        }

    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <>
      <SingleTemplateCard onClick={handleCardClick}>
        {/* ❤️ Customer like emoji */}
        {isUser && (
          <motion.div
            onClick={handleLikeToggle}
            whileTap={{ scale: 1.3 }}
            whileHover={{ scale: 1.1 }}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 10,
              cursor: "pointer",
              fontSize: "1.5rem",
              userSelect: "none",
            }}
          >
            <span>{liked ? "❤️" : "🤍"}</span>
          </motion.div>
        )}

        {/* ❌ Delete icon for crafters */}
        {isCrafter && (
          <DeleteIconWrapper
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(template._id);
            }}
          >
            <FaTimes size={16} color="#a00" />
          </DeleteIconWrapper>
        )}

        <TemplateAvatarWrapper>
          <UserAvatar previewUrl={template.mainImage} width={100} height={100} />
        </TemplateAvatarWrapper>

        <TemplateName>{template.name}</TemplateName>

        {!isCrafter && (
          <>
            <CraftName>{template.craftType}</CraftName>
            <CrafterName>by {template.crafterName}</CrafterName>
          </>
        )}

        {template.availableColors?.length > 0 && (
          <ColorsWrapper style={{ marginTop: "1rem" }}>
            {template.availableColors.map((color, idx) => (
              <ColorDot
                key={idx}
                $color={color}
                title={color}
                style={{ width: "20px", height: "20px" }}
              />
            ))}
          </ColorsWrapper>
        )}

        {template.price && (
          <PriceLabel>{Number(template.price).toFixed(2)}$</PriceLabel>
        )}

        {isCrafter && (
          <LikesWrapper>
            <HeartIcon />
            <span>{localLikesCount}</span>
          </LikesWrapper>
        )}
      </SingleTemplateCard>

      {showDetails && (
        <PopUpPage onClose={() => setShowDetails(false)}>
          <TemplateDetails
            template={template}
            mode="edit"
            onSave={handleSaveEdit}
          />
        </PopUpPage>
      )}
    </>
  );
};

export default TemplateItem;
