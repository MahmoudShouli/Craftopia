import React, { useEffect, useState } from "react";
import {
  TemplateCard,
  TopSection,
  Title,
  AddButtonWrapper,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import Button from "../button/Button";
import TemplateItem from "./TemplateItem";
import PopUpPage from "../map/PopUpPage";
import TemplateDetails from "./TemplateDetails";
import { useUser } from "../../context/UserContext";
import {
  getTemplatesByCrafter,
  createTemplate,
  updateTemplate,
  deleteTemplate, // ✅ import deleteTemplate
} from "../../api/templateService";
import { toast } from "react-toastify";

const CrafterTemplates = () => {
  const { user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("add"); // 'add' or 'edit'
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const fetchTemplates = async () => {
    try {
      const data = await getTemplatesByCrafter(user.email);
      setTemplates(data);
    } catch (err) {
      toast.error("Failed to load templates");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchTemplates();
    }
  }, [user]);

  const handleAddTemplate = () => {
    setPopupMode("add");
    setSelectedTemplate(null);
    setShowPopup(true);
  };

  const handleEditTemplate = (template) => {
    setPopupMode("edit");
    setSelectedTemplate(template);
    setShowPopup(true);
  };

  const handleSaveTemplate = async (newTemplate) => {
    try {
      if (popupMode === "add") {
        const { _id, ...templateData } = newTemplate;
        await createTemplate({
          ...templateData,
          crafterEmail: user.email,
          crafterName: user.name,
          likes: 0,
        });
        toast.success("Template added!");
      } else if (popupMode === "edit" && newTemplate._id) {
        await updateTemplate(newTemplate._id, newTemplate);
        toast.success("Template updated!");
      }
  
      setShowPopup(false);
      setSelectedTemplate(null);
      await fetchTemplates();
    } catch (err) {
      toast.error("Failed to save template");
      console.error(err);
    }
  };

  const handleDeleteTemplate = async (id) => {
    try {
      await deleteTemplate(id);
      toast.success("Template deleted!");
      await fetchTemplates();
    } catch (err) {
      toast.error("Failed to delete template");
      console.error(err);
    }
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
          <TemplateItem
            key={template._id}
            template={template}
            onEdit={() => handleEditTemplate(template)}
            onDelete={handleDeleteTemplate} 
          />
        ))}
      </TemplatesGrid>

      {showPopup && (
        <PopUpPage onClose={() => setShowPopup(false)}>
          <TemplateDetails
            mode={popupMode}
            template={selectedTemplate}
            onSave={handleSaveTemplate}
          />
        </PopUpPage>
      )}
    </TemplateCard>
  );
};

export default CrafterTemplates;
