import React, { useEffect, useState } from 'react';
import { fetchUsers as getUsersFromDB } from '../../../api/userService';
import {
  SearchCard,
  FilterBoxGroup,
  FilterBox,
  UsersGrid,
  UsersGridWrapper
} from './Search.styled';

import UserCard from '../../usercard/UserCard';
import CraftDropdown from '../../craftdropdown/CraftDropdown';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useUser } from '../../../context/UserContext';
import PopUpPage from '../../map/PopUpPage';
import MapPopup from '../../map/MapPopup';
import RatingPage from '../../starrating/RatingPage';
import SearchBar from "./SearchBar";
import { CraftValues } from '../../../constants/craftsEnum';

const Search = ({ onViewChange, setSelectedCrafter }) => {
  const [selectedCraft, setSelectedCraft] = useState('');
  const [sortByRating, setSortByRating] = useState(null);
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5);
  const { user } = useUser();
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async (distanceOverride = maxDistance) => {
    const finalDistance = distanceOverride ?? maxDistance;
    const data = await getUsersFromDB({
      query,
      selectedCraft,
      sortByRating,
      location: selectedLocation,
      maxDistance: finalDistance,
    });

    setUsers(data);
  };

  // 🔁 Live search on change
  useEffect(() => {
    fetchUsers();
  }, [query, selectedCraft, sortByRating]);

  const toggleRatingSort = () => {
    setSortByRating((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCraft('');
    setSortByRating(null);
    setSelectedLocation(null);
    fetchUsers();
  };

  const handleContact = (crafter) => {
    setSelectedCrafter?.(crafter);
    onViewChange?.("Schedules");
  };

  const handleView = (crafter) => {
    setSelectedUser(crafter);
    setShowUserPopup(true);
  };

  return (
    <SearchCard>
      <SearchBar
        query={query}
        setQuery={setQuery}
        onReset={handleReset}
      />

      <FilterBoxGroup>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={selectedCraft}
          onSelectCraft={setSelectedCraft}
        />

        <FilterBox
          onClick={toggleRatingSort}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>Rating</span>
          {sortByRating === 'asc' && <FaArrowUp />}
          {sortByRating === 'desc' && <FaArrowDown />}
        </FilterBox>

        <FilterBox 
          onClick={() => {
            setShowMap(true);
            const [lng, lat] = user.location.coordinates;
            setSelectedLocation({ lat, lng });
            fetchUsers(); 
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>Location</span>
        </FilterBox>
      </FilterBoxGroup>

      <UsersGridWrapper>
        {users.length > 0 ? (
          <UsersGrid>
            {users.map((user, index) => (
              <UserCard
                key={index}
                avatarUrl={user.avatarUrl}
                name={user.name}
                craft={user.craft}
                rating={user.rating}
                onView={() => handleView(user)}
                onContact={() => handleContact(user)}
              />
            ))}
          </UsersGrid>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem', color: '#888' }}>
            No users found 🕵️‍♂️
          </p>
        )}
      </UsersGridWrapper>

      {showMap && (
        <MapPopup
          onClose={() => setShowMap(false)}
          crafters={users}
          center={[selectedLocation.lat, selectedLocation.lng]}
          onSetDistance={(value) => {
            setMaxDistance(value);
            fetchUsers(value);
          }}
          isSearch={true}
        />
      )}
      {showUserPopup && (
        <PopUpPage onClose={() => setShowUserPopup(false)}>
          <RatingPage crafter={selectedUser} />
        </PopUpPage>
      )}
    </SearchCard>
  );
};

export default Search;
