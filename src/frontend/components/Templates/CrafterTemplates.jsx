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
  deleteTemplate,
  importTemplatesFromProfile, // ✅ NEW: Pinterest importer API
} from "../../api/templateService";
import { toast } from "react-toastify";
import styled from "styled-components";
import { ClipLoader } from "react-spinners"; // ✅ Spinner component
import { FaPlus, FaPinterestP } from "react-icons/fa";

const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  min-width: 300px;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const CrafterTemplates = () => {
  const { user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMode, setPopupMode] = useState("add");
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [showScrapeModal, setShowScrapeModal] = useState(false); // ✅ Pinterest modal
  const [scrapeUrl, setScrapeUrl] = useState("");
  const [scraping, setScraping] = useState(false);

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

  const handleScrape = async () => {
    if (!scrapeUrl.trim()) return toast.error("Please enter a Pinterest URL");

    try {
      setScraping(true);
      await importTemplatesFromProfile(scrapeUrl, user.email);
      toast.success("Templates imported from Pinterest!");
      setShowScrapeModal(false);
      setScrapeUrl("");
      await fetchTemplates();
    } catch (err) {
      toast.error("Failed to scrape Pinterest");
      console.error(err);
    } finally {
      setScraping(false);
    }
  };

  return (
    <TemplateCard>
      <TopSection
        style={{
          marginTop: "1.5rem",
          marginBottom: "0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        {/* 🏷️ Title */}
        <Title>Your Templates</Title>

        {/* 🔢 Count Box BELOW title */}
        <div
          style={{
            backgroundColor: "#F7E9D7",
            color: "#6a380f",
            padding: "6px 16px",
            borderRadius: "25px",
            fontWeight: "bold",
            marginTop: "1rem",
            fontSize: "1.2rem",
          }}
        >
          Total Templates: {templates.length}
        </div>

        {/* ➕ Buttons RIGHT aligned */}
       <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "flex-start",
          gap: "1rem",
          paddingRight: "2rem",
          marginTop: "1rem",
          marginLeft: "5rem",
        }}
      >
        <AddButtonWrapper style={{ position: "static" }}>
          <Button
            text={<FaPlus size={20} />}
            size="large"
            onClick={handleAddTemplate}
          />
        </AddButtonWrapper>

        <AddButtonWrapper style={{ position: "static" }}>
          <Button
            text={<FaPinterestP size={20} />}
            size="large"
            color="#E09F1D"
            onClick={() => setShowScrapeModal(true)}
          />
        </AddButtonWrapper>
      </div>
      </TopSection>


      <TemplatesGrid style={{ marginTop: "2rem" }}>
        {templates.map((template) => (
          <TemplateItem
            key={template._id}
            template={template}
            onEdit={() => handleEditTemplate(template)}
            onDelete={handleDeleteTemplate}
          />
        ))}
      </TemplatesGrid>

      {/* ✅ Template modal */}
      {showPopup && (
        <PopUpPage onClose={() => setShowPopup(false)}>
          <TemplateDetails
            mode={popupMode}
            template={selectedTemplate}
            onSave={handleSaveTemplate}
          />
        </PopUpPage>
      )}

      {/* ✅ Scrape modal */}
      {showScrapeModal && (
          <PopUpPage onClose={() => setShowScrapeModal(false)}>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100%", // full modal height
              }}
            >
              <div
                style={{
                  backgroundColor: "white",
                  padding: "2rem",
                  borderRadius: "16px",
                  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                  minWidth: "350px",
                  maxWidth: "90%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "1.2rem",
                }}
              >
                <label htmlFor="pinterestUrl" style={{ fontWeight: "bold", fontSize: "1rem" }}>
                  Pinterest Profile URL:
                </label>
                <Input
                  id="pinterestUrl"
                  type="text"
                  value={scrapeUrl}
                  onChange={(e) => setScrapeUrl(e.target.value)}
                  placeholder="https://www.pinterest.com/..."
                  style={{ width: "100%" }}
                />
                <Button
                  text={scraping ? "Scraping..." : "Fetch Templates"}
                  size="medium"
                  disabled={scraping}
                  onClick={handleScrape}
                />
                {scraping && <ClipLoader size={30} />}
              </div>
            </div>
          </PopUpPage>
        )}

    </TemplateCard>
  );
};

export default CrafterTemplates;
