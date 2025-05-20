import React, { useEffect, useState, useCallback } from "react";
import {
  TemplateCard,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import { FilterBoxGroup, FilterBox } from "../userprofile/search/Search.styled";
import TemplateItem from "../Templates/TemplateItem";
import { toast } from "react-toastify";
import SearchBar from "../userprofile/search/SearchBar";
import CraftDropdown from "../craftdropdown/CraftDropdown";
import { useUser } from "../../context/UserContext";
import { CraftValues } from "../../constants/craftsEnum";
import {
  fetchSortedTemplates,
  fetchRecommendedTemplates,
} from "../../api/templateService";
import { getUserLikedTemplates } from "../../api/likeService";
import { useLocation } from "react-router-dom";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const UserTemplates = () => {
  const { user } = useUser();
  const location = useLocation();

  const [templates, setTemplates] = useState([]);
  const [likedTemplateIds, setLikedTemplateIds] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState("");
  const [query, setQuery] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 100000]);

  const loadTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const [templateData, likedIds] = await Promise.all([
        isRecommended
          ? fetchRecommendedTemplates(user.email)
          : fetchSortedTemplates(),
        getUserLikedTemplates(user.email),
      ]);

      if (Array.isArray(templateData)) {
        setTemplates(templateData);
        setLikedTemplateIds(likedIds || []);
      } else {
        toast.error("Unexpected response format.");
        setTemplates([]);
        setLikedTemplateIds([]);
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load templates.");
    } finally {
      setIsLoading(false);
    }
  }, [user.email, isRecommended]);

  useEffect(() => {
    loadTemplates();
  }, [location.pathname, loadTemplates]);

  const toggleView = () => {
    setIsRecommended((prev) => !prev);
  };

  const handleReset = () => {
    setQuery("");
    setSelectedCraft("");
    setPriceRange([0, 100000]);
    loadTemplates();
  };

const handleTemplateLikeChanged = (templateId, newLiked) => {
  setLikedTemplateIds((prev) =>
    newLiked
      ? [...prev, templateId]
      : prev.filter((id) => id !== templateId)
  );

  // Optional delayed refresh
  setTimeout(() => {
    loadTemplates();
  }, 400);
};

  const filteredTemplates = templates.filter((template) => {
    const matchesCraft =
      !selectedCraft || template.craftType === selectedCraft;

    const matchesSearch =
      !query ||
      template.name?.toLowerCase().includes(query.toLowerCase()) ||
      template.tags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      ) ||
      template.crafterName?.toLowerCase().includes(query.toLowerCase());

    const matchesPrice =
      typeof template.price === "number" &&
      template.price >= priceRange[0] &&
      template.price <= priceRange[1];

    return matchesCraft && matchesSearch && matchesPrice;
  });

  return (
    <TemplateCard>
      <SearchBar query={query} setQuery={setQuery} onReset={handleReset} />

      <FilterBoxGroup>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={selectedCraft}
          onSelectCraft={(craft) => setSelectedCraft(craft)}
        />

        <FilterBox onClick={toggleView}>
          {isRecommended ? "All" : "Recommended"}
        </FilterBox>
      </FilterBoxGroup>

      <FilterBoxGroup>
        <div style={{ width: "100%", marginTop: "1rem" }}>
          <label
            style={{
              fontWeight: "bold",
              display: "block",
              marginBottom: "0.5rem",
            }}
          >
            Price Range (${priceRange[0]} - ${priceRange[1]})
          </label>
          <Slider
            range
            min={0}
            max={1000}
            step={10}
            value={priceRange}
            onChange={(range) => setPriceRange(range)}
            allowCross={false}
          />
        </div>
      </FilterBoxGroup>

      {isLoading ? (
        <p>Loading templates...</p>
      ) : (
        <TemplatesGrid>
          {filteredTemplates.map((template) => (
            <TemplateItem
              key={template._id}
              template={template}
              initiallyLiked={likedTemplateIds.includes(template._id)}
              onLikeChange={handleTemplateLikeChanged}
            />
          ))}
        </TemplatesGrid>
      )}
    </TemplateCard>
  );
};

export default UserTemplates;
