import React, { useState } from "react";
import {
  SingleTemplateCard,
  TemplateAvatarWrapper,
  TemplateName,
  CrafterName,
} from "./CrafterTemplates.styled";
import UserAvatar from "../useravatar/UserAvatar";
import PopUpPage from "../map/PopUpPage"; 
import TemplateDetails from "./TemplateDetails";

const TemplateItem = ({ template }) => {
  const [showDetails, setShowDetails] = useState(false);

  if (!template) return null;

  return (
    <>
      <SingleTemplateCard onClick={() => setShowDetails(true)}>
        <TemplateAvatarWrapper>
          <UserAvatar previewUrl={template.crafterAvatar} width={100} height={100} />
        </TemplateAvatarWrapper>
        <TemplateName>{template.name}</TemplateName>
        <CrafterName>by {template.crafterName}</CrafterName>
      </SingleTemplateCard>

      {showDetails && (
        <PopUpPage onClose={() => setShowDetails(false)}>
          <TemplateDetails template={template} />
        </PopUpPage>
      )}
    </>
  );
};

export default TemplateItem;
