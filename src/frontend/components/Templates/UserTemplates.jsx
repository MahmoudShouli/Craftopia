import React, { useEffect, useState, useCallback } from "react";
import {
  TemplateCard,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import { FilterBoxGroup, FilterBox } from "../userprofile/search/Search.styled";
import TemplateItem from "./TemplateItem";
import { toast } from "react-toastify";
import SearchBar from "../userprofile/search/SearchBar";
import CraftDropdown from "../craftdropdown/CraftDropdown";
import { useUser } from "../../context/UserContext";
import { CraftValues } from "../../constants/craftsEnum";
import { fetchSortedTemplates } from "../../api/templateService";
import { getUserLikedTemplates } from "../../api/likeService";
import { useLocation } from "react-router-dom";

const UserTemplates = () => {
  const { user } = useUser();
  const location = useLocation();

  const [templates, setTemplates] = useState([]);
  const [likedTemplateIds, setLikedTemplateIds] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState("");
  const [query, setQuery] = useState("");
  const [isRecommended, setIsRecommended] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const loadTemplates = useCallback(async () => {
    try {
      setIsLoading(true);
      const [sorted, likedIds] = await Promise.all([
        fetchSortedTemplates(),
        getUserLikedTemplates(user.email),
      ]);

      if (Array.isArray(sorted)) {
        setTemplates(sorted);
        setLikedTemplateIds(likedIds || []);
      } else {
        setTemplates([]);
        toast.error("Unexpected response format.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Failed to load templates.");
      setTemplates([]);
      setLikedTemplateIds([]);
    } finally {
      setIsLoading(false);
    }
  }, [user.email]);

  useEffect(() => {
    loadTemplates();
  }, [location.pathname, loadTemplates]);

  const toggleView = () => {
    toast.info("Recommendation feature coming soon.");
    setIsRecommended(!isRecommended);
  };

  const handleTemplateLikeChanged = () => {
    loadTemplates();
  };

  const handleReset = () => {
    setQuery("");
    setSelectedCraft("");
    loadTemplates();
  };

  const filteredTemplates = templates.filter((template) => {
    const matchesCraft =
      !selectedCraft || template.craftType === selectedCraft;

    const matchesSearch =
      !query ||
      template.name.toLowerCase().includes(query.toLowerCase()) ||
      template.tags?.some((tag) =>
        tag.toLowerCase().includes(query.toLowerCase())
      );

    return matchesCraft && matchesSearch;
  });

  return (
    <TemplateCard>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onReset={handleReset}
      />

      <FilterBoxGroup>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={selectedCraft}
          onSelectCraft={(craft) => setSelectedCraft(craft)}
        />
        <FilterBox onClick={toggleView}>Toggle View</FilterBox>
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
