import React from "react";
import {
  TemplateCard,
  TopSection,
  Title,
  AddButtonWrapper,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import Button from "../button/Button";
import TemplateItem from "./TemplateItem";

const CrafterTemplates = () => {
  const templates = [
    {
      _id: "1",
      name: "Rustic Oak Coffee Table",
      description: "Handmade oak table with a rustic finish.",
      craftType: "Woodworking",
      mainImage: "https://res.cloudinary.com/dw2tjwbdg/image/upload/v1745604179/avatars/hqta1omqji9tgwhhp2q4.jpg",
      galleryImages: [
        "https://res.cloudinary.com/dw2tjwbdg/image/upload/v1745604179/avatars/hqta1omqji9tgwhhp2q4.jpg",
        "https://res.cloudinary.com/dw2tjwbdg/image/upload/v1745197824/avatars/mu9kafpzx8dtmmqmbsyq.png",
        "https://res.cloudinary.com/dw2tjwbdg/image/upload/v1745197846/avatars/yvgrgv1l1vqhawq7cpoq.png"
      ],
      availableColors: ["red", "green", "#00fffa"],
      sizeOptions: "Small, Medium, Large",
      crafterEmail: "john@example.com",
      tags: ["Rustic", "Handmade", "Minimalist"],
      crafterName: "John Doe",
    },
    // Add more templates here
  ];

  const handleAddTemplate = () => {
    console.log("Add Template clicked!");
  };

  return (
    <TemplateCard>
      <TopSection>
        <Title>Your Templates</Title>
        <AddButtonWrapper>
          <Button text="Add Template" size="medium" onClick={handleAddTemplate} />
        </AddButtonWrapper>
      </TopSection>

      <TemplatesGrid>
        {templates.map((template) => (
          <TemplateItem key={template._id} template={template} />
        ))}
      </TemplatesGrid>
    </TemplateCard>
  );
};

export default CrafterTemplates;
