import React, { useEffect, useState } from 'react';
import { fetchUsers as getUsersFromDB } from '../api/userService';
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

  const fetchUsers = async () => {
    const data = await getUsersFromDB({ query, selectedCraft, sortByRating });
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

        <FilterBox disabled>Location</FilterBox>
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
              />
            ))}
          </UsersGrid>
        ) : (
          <p style={{ textAlign: 'center', marginTop: '2rem', fontSize: '1.2rem', color: '#888' }}>
            No users found 🕵️‍♂️
          </p>
        )}
      </UsersGridWrapper>
    </SearchCard>
  );
};

export default Search;
