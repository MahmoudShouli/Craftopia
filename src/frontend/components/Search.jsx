import React from 'react';
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

const Search = () => {
  return (
    <SearchCard>
      <SearchInputGroup>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Go</SearchButton>
      </SearchInputGroup>

      <FilterBoxGroup>
        <FilterBox>Craft</FilterBox>
        <FilterBox>Rating</FilterBox>
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
