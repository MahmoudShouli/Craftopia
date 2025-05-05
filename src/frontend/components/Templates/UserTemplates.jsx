import React, { useEffect, useState } from "react";
import {
  TemplateCard,
  TemplatesGrid,
} from "./CrafterTemplates.styled";
import { FilterBoxGroup } from "../userprofile/search/Search.styled";

import TemplateItem from "./TemplateItem";
import { getAllTemplates } from "../../api/templateService";
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


  const fetchTemplates = async () => {
    try {
      const data = await getAllTemplates();
      setTemplates(data);
    } catch (err) {
      toast.error("Failed to load templates");
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
      fetchTemplates();
      fetchLikes();
    }
  }, [user]);

  return (
    <TemplateCard>
      <SearchBar
        // query={}
        // setQuery={}
        // onSearch={}
        // onReset={}
      />

      <FilterBoxGroup>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={selectedCraft}
          onSelectCraft={setSelectedCraft}
        />
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
