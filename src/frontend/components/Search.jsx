import React, { useEffect, useState } from 'react';
import { fetchUsers as getUsersFromDB } from '../api/userService';
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import {
  SearchCard,
  FilterBoxGroup,
  FilterBox,
  SearchInputGroup,
  SearchInput,
  SearchButton,
  UsersGrid,
  UsersGridWrapper
} from '../styles/Search.styled';
import UserCard from './UserCard';
import CraftDropdown from './CraftDropdown';
import { FaArrowUp, FaArrowDown } from 'react-icons/fa';
import { useUser } from '../context/UserContext';
import MapPopup from './MapPopup';

const crafts = [
  'Plumber',
  'Electrician',
  'Painter',
  'Carpenter',
  'Tiler',
  'Cleaner',
  'Plasterer',
  'Aluminum and Glass Technician',
];

const Search = () => {
  const [selectedCraft, setSelectedCraft] = useState('');
  const [sortByRating, setSortByRating] = useState(null); // 'asc' | 'desc'
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [showMap, setShowMap] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const { user } = useUser();

  const fetchUsers = async () => {
    const data = await getUsersFromDB({
      query,
      selectedCraft,
      sortByRating,
      location: selectedLocation,
    });
    
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, [selectedCraft, sortByRating]);


  const handleSearch = (e) => {
    e.preventDefault();
    fetchUsers();
  };

  const toggleRatingSort = () => {
    setSortByRating((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleReset = () => {
    setQuery('');
    setSelectedCraft('');
    setSortByRating(null);
    fetchUsers();
  };

  return (
    <SearchCard>
      <SearchInputGroup as="form" onSubmit={handleSearch}>
        <SearchInput
          type="text"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchButton type="submit">Go</SearchButton>
        <SearchButton
          type="button"
          onClick={handleReset}
        >
          Reset
        </SearchButton>
      </SearchInputGroup>

      <FilterBoxGroup>
        <CraftDropdown
          crafts={crafts}
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
            if (user && user.location && user.location.coordinates) {
              const [lng, lat] = user.location.coordinates;
              setSelectedLocation({ lat, lng }); 
              fetchUsers(); 
            } else {
              
              setShowMap(true);
            }
          }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <span>Location</span>
        </FilterBox>

      </FilterBoxGroup>

      {selectedLocation && users.length > 0 && (
        <div style={{ width: "100%", height: "400px", marginTop: "1rem" }}>
          <MapContainer center={[selectedLocation.lat, selectedLocation.lng]} zoom={13} style={{ height: "100%", width: "100%" }}>
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

            {/* User's location */}
            <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
              <Popup>You are here</Popup>
            </Marker>

            {/* Nearby crafters */}
            {users.map((user, idx) => {
              const [lng, lat] = user.location?.coordinates || [];
              if (!lat || !lng) return null;

              const avatarIcon = L.icon({
                iconUrl: user.avatarUrl || "https://cdn-icons-png.flaticon.com/512/847/847969.png",
                iconSize: [40, 40],
                className: 'custom-avatar-icon'
              });

              return (
                <Marker key={idx} position={[lat, lng]} icon={avatarIcon}>
                  <Popup>
                    <strong>{user.name}</strong><br />
                    {user.craft}
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      )}


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
          onSelectCoordinates={(locationString) => {
            const [lat, lng] = locationString.split(',').map(Number);
            setSelectedLocation({ lat, lng });
            setShowMap(false);
            fetchUsers(); 
          }}          
        />
      )}
    </SearchCard>
  );
};

export default Search;
