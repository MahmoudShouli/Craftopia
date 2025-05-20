import React, { useRef, useState, useEffect } from "react";
import { useUser } from "../../context/UserContext";
import { toast } from "react-toastify";
import { HexColorPicker } from "react-colorful";
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
  RemoveIcon,
  RemoveTagIcon,
  SaveButtonWrapper,
  ColorPickerWrapper,
} from "./CrafterTemplates.styled";
import GalleryCarousel from "./GalleryCarousel";
import Button from "../button/Button";
import {
  uploadImage,
  extractColorsFromImage,
  generateFromImage,
} from "../../api/templateService";
import { TagsByCraft } from "../../constants/tagsEnum";

const TemplateDetails = ({ template = null, mode = "add", onSave }) => {
  const { user } = useUser();
  const isCrafter = user?.role === "crafter";
  const fileInputRef = useRef(null);

  const [galleryImages, setGalleryImages] = useState([]);
  const [newColor, setNewColor] = useState("#6a380f");
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [lastUploadedImage, setLastUploadedImage] = useState(null);

  const [localTemplate, setLocalTemplate] = useState({
    _id: "",
    name: "",
    description: "",
    price: "",
    availableColors: [],
    tags: [],
  });

  const [isGenerating, setIsGenerating] = useState(false); // 🆕

  useEffect(() => {
    if (template) {
      setLocalTemplate({
        _id: template._id || "",
        name: template.name || "",
        description: template.description || "",
        price: template.price || "",
        availableColors: template.availableColors || [],
        tags: template.tags || [],
      });
      setGalleryImages(template.galleryImages || []);
    } else {
      setLocalTemplate({
        _id: "",
        name: "",
        description: "",
        price: "",
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
    if (!localTemplate.availableColors.includes(newColor)) {
      setLocalTemplate((prev) => ({
        ...prev,
        availableColors: [...prev.availableColors, newColor],
      }));
    }
    setShowColorPicker(false);
  };

  const handleRemoveColor = (index) => {
    setLocalTemplate((prev) => ({
      ...prev,
      availableColors: prev.availableColors.filter((_, idx) => idx !== index),
    }));
  };

  const toggleTag = (tag) => {
    setLocalTemplate((prev) => ({
      ...prev,
      tags: prev.tags.includes(tag)
        ? prev.tags.filter((t) => t !== tag)
        : [...prev.tags, tag],
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
      setLastUploadedImage(uploaded);
      toast.success("Image uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload image");
      console.error(err);
    }
  };

  const handleGenerateInfo = async () => {
    if (!lastUploadedImage) return;

    try {
      setIsGenerating(true); // 🆕 Show spinner & disable

      // Fade out
      document.getElementById("info-fields").style.opacity = "0.4";

      setLocalTemplate((prev) => ({
        ...prev,
        name: "",
        description: "",
        availableColors: [],
      }));

      await new Promise((r) => setTimeout(r, 400)); // Allow fade-out to complete

      const colors = await extractColorsFromImage(lastUploadedImage);
      const { title, description } = await generateFromImage(lastUploadedImage);

      setLocalTemplate((prev) => ({
        ...prev,
        availableColors: colors,
        name: title,
        description: description,
      }));

      toast.success("Info regenerated!");
    } catch (err) {
      toast.error("Failed to regenerate info");
      console.error(err);
    } finally {
      setTimeout(() => {
        document.getElementById("info-fields").style.opacity = "1"; // Fade in
        setIsGenerating(false); // Re-enable button
      }, 300);
    }
  };

  const handleImageRemove = (index) => {
    const removed = galleryImages[index];
    setGalleryImages((prev) => prev.filter((_, idx) => idx !== index));
    toast.info("Image removed");

    if (removed === lastUploadedImage) {
      setLastUploadedImage(null);
    }
  };

  const handleSaveChanges = () => {
    if (
      !localTemplate.name ||
      !localTemplate.description ||
      galleryImages.length === 0 ||
      !localTemplate.price
    ) {
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

  const userCraft =
    user?.craft?.charAt(0).toUpperCase() + user?.craft?.slice(1);
  const availableTags = TagsByCraft[userCraft] || [];

  return (
    <DetailsWrapper>
      <TopContent>
        <LeftSection>
          <div style={{ width: "100%" }}>
            {galleryImages.length > 0 && (
              <GalleryCarousel
                images={galleryImages}
                onImageRemove={isCrafter ? handleImageRemove : undefined}
              />
            )}

            {isCrafter && (
              <div style={{ marginTop: "1rem", textAlign: "center" }}>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleImageSelect}
                  style={{ display: "none" }}
                />
                <Button
                  text="Add Image"
                  size="medium"
                  color="#6a380f"
                  onClick={handleUploadButtonClick}
                />
                {lastUploadedImage && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <Button
                      text={
                        isGenerating ? "Generating..." : "Generate Info from Image"
                      }
                      size="small"
                      color="#4e2c0b"
                      onClick={handleGenerateInfo}
                      disabled={isGenerating} // 🆕
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </LeftSection>

        <RightSection>
          <div
            id="info-fields"
            style={{ transition: "opacity 0.3s ease" }} // 🆕 Fade effect
          >
            <FieldWrapper>
              <FieldGroup>
                <Label>Name</Label>
                <StyledInput
                  type="text"
                  value={localTemplate.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  disabled={!isCrafter}
                />
              </FieldGroup>
            </FieldWrapper>

            <FieldWrapper>
              <FieldGroup>
                <Label>Craft Type</Label>
                <StyledInput
                  type="text"
                  value={template?.craftType || user.craft}
                  disabled
                />
              </FieldGroup>
            </FieldWrapper>

            <FieldWrapper>
              <FieldGroup>
                <Label>Crafter</Label>
                <StyledInput
                  type="text"
                  value={template?.crafterName || user.name}
                  disabled
                />
              </FieldGroup>
            </FieldWrapper>

            <VerticalFieldWrapper>
              <Label>Description</Label>
              <StyledTextarea
                value={localTemplate.description}
                onChange={(e) => handleChange("description", e.target.value)}
                disabled={!isCrafter}
              />
            </VerticalFieldWrapper>

            <FieldWrapper>
              <FieldGroup>
                <Label>Price</Label>
                <StyledInput
                  type="number"
                  min="0"
                  step="0.01"
                  placeholder="Enter price in USD"
                  value={localTemplate.price}
                  onChange={(e) => handleChange("price", e.target.value)}
                  disabled={!isCrafter}
                />
              </FieldGroup>
            </FieldWrapper>
          </div>
        </RightSection>
      </TopContent>

      <BottomSection>
        <div>
          <InfoTitle>Available Colors</InfoTitle>
          <ColorsWrapper style={{ transition: "opacity 0.3s ease" }}>
            {localTemplate.availableColors.map((color, idx) => (
              <div
                key={idx}
                style={{
                  position: "relative",
                  display: "inline-block",
                  marginRight: "10px",
                  marginBottom: "10px",
                }}
              >
                <ColorDot $color={color} />
                {isCrafter && (
                  <RemoveIcon onClick={() => handleRemoveColor(idx)}>×</RemoveIcon>
                )}
              </div>
            ))}
          </ColorsWrapper>

          {isCrafter && (
            <ColorPickerWrapper>
              {showColorPicker ? (
                <>
                  <HexColorPicker color={newColor} onChange={setNewColor} />
                  <Button text="Add Color" onClick={handleAddColor} size="small" />
                </>
              ) : (
                <Button
                  text="+ Select Color"
                  onClick={() => setShowColorPicker(true)}
                  size="small"
                />
              )}
            </ColorPickerWrapper>
          )}
        </div>

        <div>
          <InfoTitle>Tags</InfoTitle>
          <TagsWrapper>
            {isCrafter
              ? availableTags.map((tag) => {
                  const selected = localTemplate.tags.includes(tag);
                  return (
                    <div key={tag} style={{ position: "relative" }}>
                      <Tag
                        onClick={() => toggleTag(tag)}
                        style={{
                          backgroundColor: selected ? "#6a380f" : "#fff",
                          color: selected ? "#fff" : "#6a380f",
                          cursor: "pointer",
                          border: "1px solid #6a380f",
                        }}
                      >
                        {tag}
                      </Tag>
                      {selected && (
                        <RemoveTagIcon onClick={() => toggleTag(tag)}>×</RemoveTagIcon>
                      )}
                    </div>
                  );
                })
              : localTemplate.tags.map((tag, idx) => (
                  <Tag
                    key={idx}
                    style={{
                      backgroundColor: "#6a380f",
                      color: "#fff",
                      border: "1px solid #6a380f",
                    }}
                  >
                    {tag}
                  </Tag>
                ))}
          </TagsWrapper>
        </div>
      </BottomSection>

      {isCrafter && (
        <SaveButtonWrapper>
          <Button
            text={mode === "add" ? "Add Template" : "Save Changes"}
            size="large"
            color="#6a380f"
            onMouseDown={(e) => e.preventDefault()}
            onClick={() => requestAnimationFrame(handleSaveChanges)}
          />
        </SaveButtonWrapper>
      )}
    </DetailsWrapper>
  );
};

export default TemplateDetails;
