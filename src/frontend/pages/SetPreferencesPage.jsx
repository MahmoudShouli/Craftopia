import React, { useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useNavigate } from "react-router-dom";
import Button from "../components/button/Button";
import {
  PageWrapper,
  PreferencesCard,
  SectionTitle,
  SectionWrapper,
  ColorsContainer,
  ColorCircle,
  AddColorButton,
  ColorPickerWrapper,
  TagContainer,
  TagBox,
  ContentWrapper,
  ButtonWrapper
} from "../styles/SetPreferencesPage.styled";

const tagOptions = ["wooden", "modern", "classic", "elegant", "handmade"];

const SetPreferencesPage = () => {
  const navigate = useNavigate();

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

  const handleSubmit = () => {
    console.log("Selected Colors:", selectedColors);
    console.log("Selected Tags:", selectedTags);
    navigate("/userprofile");
  };

  return (
    <PageWrapper>
      <PreferencesCard>
        <h1 style={{ color: "#6a380f", marginBottom: "2rem" }}>Select Your Preferences</h1>

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
              {tagOptions.map((tag) => (
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

        {/* Button at bottom */}
        <ButtonWrapper>
          <Button text="Save Preferences" onClick={handleSubmit} size="large"/>
        </ButtonWrapper>
      </PreferencesCard>
    </PageWrapper>
  );
};

export default SetPreferencesPage;
