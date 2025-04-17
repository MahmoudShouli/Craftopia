import React from 'react';
import {
  SearchCard,
  SearchTitle,
  SearchDescription,
  SearchInputGroup,
  SearchInput,
  SearchButton
} from '../styles/Search.styled';

const Search = () => {
  return (
    <SearchCard>
      <SearchTitle>Search for Users</SearchTitle>
      <SearchDescription>Enter a name, email, or role to find a user.</SearchDescription>

      <SearchInputGroup>
        <SearchInput type="text" placeholder="Search..." />
        <SearchButton>Go</SearchButton>
      </SearchInputGroup>
    </SearchCard>
  );
};

export default Search;
