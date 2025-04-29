import React, { useState } from "react";
import {
  DetailsWrapper,
  TopContent,
  LeftSection,
  RightSection,
  BottomSection,
  FieldWrapper,
  FieldGroup,
  VerticalFieldWrapper,
  Label,
  StyledInput,
  StyledTextarea,
  InfoTitle,
  TagsWrapper,
  Tag,
  ColorsWrapper,
  ColorDot,
  AddButton,
  StyledSmallInput,
  RemoveIcon,
  RemoveTagIcon,
  SaveButtonWrapper,
} from "./CrafterTemplates.styled";

import GalleryCarousel from "./GalleryCarousel";
import UserAvatar from "../useravatar/UserAvatar";
import Button from "../button/Button";

const TemplateDetails = ({ template }) => {
  const [formData, setFormData] = useState({
    name: template.name,
    description: template.description,
    craftType: template.craftType,
    crafterName: template.crafterName,
    availableColors: template.availableColors || [],
    tags: template.tags || [],
  });

  const [newColor, setNewColor] = useState("");
  const [newTag, setNewTag] = useState("");

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddColor = () => {
    if (newColor.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() !== "") {
      setFormData((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveColor = (index) => {
    setFormData((prev) => ({
      ...prev,
      availableColors: prev.availableColors.filter((_, idx) => idx !== index),
    }));
  };

  const handleRemoveTag = (index) => {
    setFormData((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== index),
    }));
  };

  const handleSaveChanges = () => {
    console.log("🔔 Saving Updated Template:");
    console.log(formData);
  };

  if (!template) return null;

  return (
    <DetailsWrapper>
      {/* ✅ Everything scrollable inside */}
      <TopContent>
        <LeftSection>
          <UserAvatar previewUrl={template.mainImage} width={200} height={200} />
          {template.galleryImages?.length > 0 && (
            <GalleryCarousel images={template.galleryImages} />
          )}
        </LeftSection>

        <RightSection>
          <FieldWrapper>
            <FieldGroup>
              <Label>Name</Label>
              <StyledInput
                type="text"
                value={formData.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FieldGroup>
          </FieldWrapper>

          <FieldWrapper>
            <FieldGroup>
              <Label>Craft Type</Label>
              <StyledInput
                type="text"
                value={formData.craftType}
                onChange={(e) => handleChange("craftType", e.target.value)}
              />
            </FieldGroup>
          </FieldWrapper>

          <FieldWrapper>
            <FieldGroup>
              <Label>Crafter</Label>
              <StyledInput
                type="text"
                value={formData.crafterName}
                disabled
              />
            </FieldGroup>
          </FieldWrapper>

          <VerticalFieldWrapper>
            <Label>Description</Label>
            <StyledTextarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </VerticalFieldWrapper>
        </RightSection>
      </TopContent>

      <BottomSection>
        {/* Colors */}
        <div>
          <InfoTitle>Available Colors</InfoTitle>
          <ColorsWrapper>
            {formData.availableColors.map((color, idx) => (
              <div
                key={idx}
                style={{ position: "relative", display: "inline-block" }}
              >
                <ColorDot $color={color} />
                <RemoveIcon onClick={() => handleRemoveColor(idx)}>×</RemoveIcon>
              </div>
            ))}
          </ColorsWrapper>
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <StyledSmallInput
              type="text"
              placeholder="Add color..."
              value={newColor}
              onChange={(e) => setNewColor(e.target.value)}
            />
            <AddButton onClick={handleAddColor}>＋</AddButton>
          </div>
        </div>

        {/* Tags */}
        <div>
          <InfoTitle>Tags</InfoTitle>
          <TagsWrapper>
            {formData.tags.map((tag, idx) => (
              <div
                key={idx}
                style={{ position: "relative", display: "inline-block" }}
              >
                <Tag>{tag}</Tag>
                <RemoveTagIcon onClick={() => handleRemoveTag(idx)}>×</RemoveTagIcon>
              </div>
            ))}
          </TagsWrapper>
          <div style={{ marginTop: "0.5rem", display: "flex", gap: "0.5rem" }}>
            <StyledSmallInput
              type="text"
              placeholder="Add tag..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
            />
            <AddButton onClick={handleAddTag}>＋</AddButton>
          </div>
        </div>
      </BottomSection>

      {/* ✅ Save Button at bottom */}
      <SaveButtonWrapper>
        <Button
          text="Save Changes"
          size="large"
          color="#6a380f"
          onClick={handleSaveChanges}
        />
      </SaveButtonWrapper>
    </DetailsWrapper>
  );
};

export default TemplateDetails;
