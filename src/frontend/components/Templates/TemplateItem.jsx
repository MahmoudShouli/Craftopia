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
} from "./CrafterTemplates.styled";

import UserAvatar from "../useravatar/UserAvatar";
import PopUpPage from "../map/PopUpPage";
import TemplateDetails from "./TemplateDetails";
import { useUser } from "../../context/UserContext";
import { FaTimes } from "react-icons/fa";

const TemplateItem = ({ template, onEdit, onDelete }) => {
  const { user } = useUser();
  const [showDetails, setShowDetails] = useState(false);

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

  const isCrafter = user?.role === "crafter";

  return (
    <>
      <SingleTemplateCard onClick={handleCardClick}>
        {isCrafter && (
          <DeleteIconWrapper
            onClick={(e) => {
              e.stopPropagation(); // prevent opening popup
              if (onDelete) onDelete(template._id);
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

        {isCrafter && (
          <LikesWrapper>
            <HeartIcon />
            <span>{template.likes}</span>
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
