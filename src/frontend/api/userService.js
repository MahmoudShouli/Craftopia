import axios from "axios";

export const fetchUsers = async ({
  query,
  selectedCraft,
  sortByRating,
  location,
}) => {
  try {
    const params = {};
    if (query) params.query = query;
    if (selectedCraft) params.craft = selectedCraft;
    if (sortByRating) {
      params.sortBy = "rating";
      params.order = sortByRating;
    }
    if (location) {
      params.lat = location.lat;
      params.lng = location.lng;
    }

    const res = await axios.get("http://localhost:3000/user/search", {
      params,
    });
    return res.data.users;
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return [];
  }
};
