// UserTemplates.jsx
import React, { useEffect, useState } from "react";
import {
  TemplateCard,
  TopSection,
  Title,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import TemplateItem from "./TemplateItem";
import { getAllTemplates } from "../../api/templateService";
import { toast } from "react-toastify";

const UserTemplates = () => {
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = async () => {
    try {
      const data = await getAllTemplates(); // 👈 use a different API than crafter-specific
      setTemplates(data);
    } catch (err) {
      toast.error("Failed to load templates");
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <TemplateCard>
      <TopSection>
        <Title>Explore Templates</Title>
      </TopSection>

      <TemplatesGrid>
        {templates.map((template) => (
          <TemplateItem
            key={template._id}
            template={template}
          />
        ))}
      </TemplatesGrid>
    </TemplateCard>
  );
};

export default UserTemplates;
