import React from "react";
import { SearchInputGroup, SearchInput, SearchButton } from "./Search.styled";

const SearchBar = ({ query, setQuery, onReset }) => {
  return (
    <SearchInputGroup>
      <SearchInput
        type="text"
        placeholder="Search by name ..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <SearchButton type="button" onClick={onReset}>
        Reset
      </SearchButton>
    </SearchInputGroup>
  );
};

export default SearchBar;
