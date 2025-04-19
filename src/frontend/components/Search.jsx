import React, { useState } from 'react';
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
  const [sortByRating, setSortByRating] = useState(null); // null | 'asc' | 'desc'

  const toggleRatingSort = () => {
    setSortByRating((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  return (
    <SearchCard>
      <SearchInputGroup>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Go</SearchButton>
      </SearchInputGroup>

      <FilterBoxGroup>
        <CraftDropdown
          crafts={crafts}
          selectedCraft={selectedCraft}
          onSelectCraft={setSelectedCraft}
        />

      <FilterBox onClick={toggleRatingSort} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <span>Rating</span>
        {sortByRating === 'asc' && <FaArrowUp />}
        {sortByRating === 'desc' && <FaArrowDown />}
      </FilterBox>

        <FilterBox>Location</FilterBox>
      </FilterBoxGroup>

      <UsersGridWrapper>
        <UsersGrid>
          <UserCard
            avatarUrl="https://res.cloudinary.com/dw2tjwbdg/image/upload/v1744924591/avatars/bkyogajwospqjidrm4mv.png"
            name="Ali Osman"
            craft="Plumber"
          />
          <UserCard
            avatarUrl="https://res.cloudinary.com/dw2tjwbdg/image/upload/v1744924591/avatars/bkyogajwospqjidrm4mv.png"
            name="Ali Osman"
            craft="Plumber"
          />
          <UserCard
            avatarUrl="https://res.cloudinary.com/dw2tjwbdg/image/upload/v1744924591/avatars/bkyogajwospqjidrm4mv.png"
            name="Ali Osman"
            craft="Plumber"
          />
          <UserCard
            avatarUrl="https://res.cloudinary.com/dw2tjwbdg/image/upload/v1744924591/avatars/bkyogajwospqjidrm4mv.png"
            name="Ali Osman"
            craft="Plumber"
          />
          <UserCard
            avatarUrl="https://res.cloudinary.com/dw2tjwbdg/image/upload/v1744924591/avatars/bkyogajwospqjidrm4mv.png"
            name="Ali Osman"
            craft="Plumber"
          />
          
        </UsersGrid>
      </UsersGridWrapper>
    </SearchCard>
  );
};

export default Search;
