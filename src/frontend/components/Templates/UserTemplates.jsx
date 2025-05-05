import React, { useEffect, useState } from "react";
import {
  TemplateCard,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import { FilterBoxGroup , FilterBox } from "../userprofile/search/Search.styled";

import TemplateItem from "./TemplateItem";
import {
  getMostLikedTemplates,
} from "../../api/templateService";
import { getUserLikedTemplates } from "../../api/likeService";
import { toast } from "react-toastify";
import SearchBar from "../userprofile/search/SearchBar";
import CraftDropdown from "../craftdropdown/CraftDropdown";
import { useUser } from "../../context/UserContext";
import { CraftValues } from "../../constants/craftsEnum";

const UserTemplates = () => {
  const { user } = useUser();
  const [templates, setTemplates] = useState([]);
  const [likedTemplateIds, setLikedTemplateIds] = useState([]);
  const [selectedCraft, setSelectedCraft] = useState("");
  const [isRecommended, setIsRecommended] = useState(false); // kept for future use

  const fetchMostLiked = async () => {
    try {
      const data = await getMostLikedTemplates();
      setTemplates(data);
    } catch (err) {
      toast.error("Failed to load templates by likes");
      console.error(err);
    }
  };

  const fetchLikes = async () => {
    try {
      const ids = await getUserLikedTemplates(user.email);
      setLikedTemplateIds(ids);
    } catch (err) {
      toast.error("Failed to load likes");
      console.error(err);
    }
  };

  useEffect(() => {
    if (user?.email) {
      fetchMostLiked();
      fetchLikes();
    }
  }, [user]);

  const toggleView = () => {
    toast.info("Recommendation feature coming soon.");
    // Keep this function for future expansion
    setIsRecommended(!isRecommended);
  };

  return (
    <TemplateCard>
      <SearchBar />

      <FilterBoxGroup>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={selectedCraft}
          onSelectCraft={setSelectedCraft}
        />

        <FilterBox onClick={toggleView}>
          Toggle View
        </FilterBox>
      </FilterBoxGroup>

      <TemplatesGrid>
        {templates.map((template) => (
          <TemplateItem
            key={template._id}
            template={template}
            initiallyLiked={likedTemplateIds.includes(template._id)}
          />
        ))}
      </TemplatesGrid>
    </TemplateCard>
  );
};

export default UserTemplates;
