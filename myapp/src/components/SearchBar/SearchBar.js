import React from "react";
import "./SearchBar.css";

const SearchBar = ({ value, onSearch }) => {
  return (
    <input
      className="search-bar"
      type="text"
      placeholder="Search by name or email..."
      value={value}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
