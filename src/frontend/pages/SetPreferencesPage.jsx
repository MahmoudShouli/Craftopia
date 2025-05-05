import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import Button from "../components/button/Button";
import { saveUserPreferences } from "../api/userService";
import { useUser } from "../context/UserContext";

import {
  PageWrapper,
  PreferencesCard,
  SectionTitle,
  SectionWrapper,
  ColorsContainer,
  ColorCircle,
  ColorPickerWrapper,
  TagContainer,
  TagBox,
  ContentWrapper,
  ButtonWrapper,
} from "../styles/SetPreferencesPage.styled";

import { TagValues } from "../constants/tagsEnum"; 

const SetPreferencesPage = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const [selectedColors, setSelectedColors] = useState([]);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [tempColor, setTempColor] = useState("#6a380f");
  const [selectedTags, setSelectedTags] = useState([]);

  const addColor = () => {
    if (!selectedColors.includes(tempColor)) {
      setSelectedColors([...selectedColors, tempColor]);
    }
    setColorPickerVisible(false);
  };

  const removeColor = (color) => {
    setSelectedColors(selectedColors.filter((c) => c !== color));
  };

  const toggleTag = (tag) => {
    setSelectedTags(
      selectedTags.includes(tag)
        ? selectedTags.filter((t) => t !== tag)
        : [...selectedTags, tag]
    );
  };

  const handleSubmit = async () => {
    try {
      if (!user || !user.email) {
        toast.error("You must be logged in.");
        return;
      }

      await saveUserPreferences({
        email: user.email,
        favoriteColors: selectedColors,
        preferredTags: selectedTags,
      });

      toast.success("Preferences saved successfully!");
      navigate("/");
    } catch (err) {
      toast.error("Failed to save preferences.");
    }
  };

  return (
    <PageWrapper>
      <PreferencesCard>
        <h1 style={{ color: "#6a380f", marginBottom: "2rem", textAlign: "center" }}>
          Select Your Preferences
        </h1>

        <ContentWrapper>
          {/* Colors Section */}
          <SectionWrapper>
            <SectionTitle>Favorite Colors</SectionTitle>

            <ColorsContainer>
              {selectedColors.map((color) => (
                <ColorCircle
                  key={color}
                  color={color}
                  onClick={() => removeColor(color)}
                />
              ))}
            </ColorsContainer>

            {!colorPickerVisible ? (
              <ButtonWrapper>
                <Button
                  text="+ Add Color"
                  onClick={() => setColorPickerVisible(true)}
                  size="medium"
                />
              </ButtonWrapper>
            ) : (
              <ColorPickerWrapper>
                <HexColorPicker color={tempColor} onChange={setTempColor} />
                <Button
                  text="Select Color"
                  onClick={addColor}
                  size="medium"
                />
              </ColorPickerWrapper>
            )}
          </SectionWrapper>

          {/* Tags Section */}
          <SectionWrapper>
            <SectionTitle>Preferred Tags</SectionTitle>
            <TagContainer>
              {TagValues.map((tag) => (
                <TagBox
                  key={tag}
                  selected={selectedTags.includes(tag)}
                  onClick={() => toggleTag(tag)}
                >
                  {tag}
                </TagBox>
              ))}
            </TagContainer>
          </SectionWrapper>
        </ContentWrapper>

        {/* Submit Button */}
        <ButtonWrapper>
          <Button text="Save Preferences" onClick={handleSubmit} size="large" />
        </ButtonWrapper>
      </PreferencesCard>
    </PageWrapper>
  );
};

export default SetPreferencesPage;
