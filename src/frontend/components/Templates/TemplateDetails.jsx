import React, { useRef, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
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
import Button from "../button/Button";
import { uploadImage } from "../../api/templateService";

const TemplateDetails = ({ template = null, mode = "add", onSave }) => {
  const { user } = useUser();
  const fileInputRef = useRef(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [newColor, setNewColor] = useState("");
  const [newTag, setNewTag] = useState("");
  const [localTemplate, setLocalTemplate] = useState({
    _id: "",
    name: "",
    description: "",
    availableColors: [],
    tags: [],
  });

  // Load the incoming template into localTemplate
  useEffect(() => {
    if (template) {
      setLocalTemplate({
        _id: template._id || "",
        name: template.name || "",
        description: template.description || "",
        availableColors: template.availableColors || [],
        tags: template.tags || [],
      });
      setGalleryImages(template.galleryImages || []);
    } else {
      setLocalTemplate({
        _id: "",
        name: "",
        description: "",
        availableColors: [],
        tags: [],
      });
      setGalleryImages([]);
    }
  }, [template]);

  const handleChange = (field, value) => {
    setLocalTemplate((prev) => ({ ...prev, [field]: value }));
  };

  const handleAddColor = () => {
    if (newColor.trim()) {
      setLocalTemplate((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, newColor.trim()],
      }));
      setNewColor("");
    }
  };

  const handleAddTag = () => {
    if (newTag.trim()) {
      setLocalTemplate((prev) => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()],
      }));
      setNewTag("");
    }
  };

  const handleRemoveColor = (index) => {
    setLocalTemplate((prev) => ({
      ...prev,
      availableColors: prev.availableColors.filter((_, idx) => idx !== index),
    }));
  };

  const handleRemoveTag = (index) => {
    setLocalTemplate((prev) => ({
      ...prev,
      tags: prev.tags.filter((_, idx) => idx !== index),
    }));
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const uploaded = await uploadImage(file);
      setGalleryImages((prev) => [...prev, uploaded]);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    }
  };

  const handleImageRemove = (index) => {
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== index));
    toast.info("Image removed from gallery");
  };

  const handleSaveChanges = () => {
    if (!localTemplate.name || !localTemplate.description || galleryImages.length === 0) {
      toast.error("Please complete all fields and add at least one image.");
      return;
    }

    const updatedFormData = {
      ...localTemplate,
      galleryImages,
      mainImage: galleryImages[0],
      craftType: user.craft,
      crafterName: user.name,
    };

    onSave(updatedFormData);
  };

  return (
    <DetailsWrapper>
      <TopContent>
        <LeftSection>
          <div style={{ width: "100%" }}>
            {galleryImages.length > 0 && (
              <GalleryCarousel images={galleryImages} onImageRemove={handleImageRemove} />
            )}
            <div style={{ marginTop: "1rem", textAlign: "center" }}>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: "none" }}
              />
              <Button text="Add Image" size="medium" color="#6a380f" onClick={handleUploadButtonClick} />
            </div>
          </div>
        </LeftSection>

        <RightSection>
          <FieldWrapper>
            <FieldGroup>
              <Label>Name</Label>
              <StyledInput
                type="text"
                value={localTemplate.name}
                onChange={(e) => handleChange("name", e.target.value)}
              />
            </FieldGroup>
          </FieldWrapper>

          <FieldWrapper>
            <FieldGroup>
              <Label>Craft Type</Label>
              <StyledInput type="text" value={user.craft} disabled />
            </FieldGroup>
          </FieldWrapper>

          <FieldWrapper>
            <FieldGroup>
              <Label>Crafter</Label>
              <StyledInput type="text" value={user.name} disabled />
            </FieldGroup>
          </FieldWrapper>

          <VerticalFieldWrapper>
            <Label>Description</Label>
            <StyledTextarea
              value={localTemplate.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </VerticalFieldWrapper>
        </RightSection>
      </TopContent>

      <BottomSection>
        {/* Available Colors */}
        <div>
          <InfoTitle>Available Colors</InfoTitle>
          <ColorsWrapper>
            {localTemplate.availableColors.map((color, idx) => (
              <div key={idx} style={{ position: "relative" }}>
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
            {localTemplate.tags.map((tag, idx) => (
              <div key={idx} style={{ position: "relative" }}>
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

      <SaveButtonWrapper>
      <Button
        text={mode === "add" ? "Add Template" : "Save Changes"}
        size="large"
        color="#6a380f"
        onMouseDown={(e) => e.preventDefault()} // <- prevent losing focus
        onClick={() => {
          requestAnimationFrame(() => handleSaveChanges());
        }}
      />
      </SaveButtonWrapper>
    </DetailsWrapper>
  );
};

export default TemplateDetails;
