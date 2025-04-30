import React, { useState } from "react";
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
  HeartIconWrapper,
} from "./CrafterTemplates.styled";

import UserAvatar from "../useravatar/UserAvatar";
import PopUpPage from "../map/PopUpPage";
import TemplateDetails from "./TemplateDetails";
import { useUser } from "../../context/UserContext";
import { FaTimes, FaHeart } from "react-icons/fa";
import { toggleLike } from "../../api/likeService";

const TemplateItem = ({ template, onEdit, onDelete, initiallyLiked = false }) => {
  const { user } = useUser();
  const [showDetails, setShowDetails] = useState(false);
  const [liked, setLiked] = useState(initiallyLiked);
  const [localLikesCount, setLocalLikesCount] = useState(template.likes || 0);

  const isCrafter = user?.role === "crafter";
  const isUser = user?.role === "customer";

  if (!template) return null;

  const handleCardClick = () => {
    setShowDetails(true);
  };

  const handleSaveEdit = (updatedTemplate) => {
    if (onEdit) {
      onEdit(updatedTemplate);
    }
    setShowDetails(false);
  };

  const handleLikeToggle = async (e) => {
    e.stopPropagation();
    try {
      const res = await toggleLike(user.email, template._id);
      setLiked(res.liked);
      setLocalLikesCount((prev) => prev + (res.liked ? 1 : -1));
    } catch (err) {
      console.error("Failed to toggle like:", err);
    }
  };

  return (
    <>
      <SingleTemplateCard onClick={handleCardClick}>
        {/* Customer like icon */}
        {isUser && (
          <HeartIconWrapper onClick={handleLikeToggle}>
            <FaHeart color={liked ? "red" : "#ccc"} size={18} />
          </HeartIconWrapper>
        )}

        {/* Crafter delete icon */}
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

        {/* Show likes count for crafters only */}
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
