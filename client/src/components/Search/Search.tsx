import React, { FC, useState, useEffect } from "react";

interface SearchProps {
  setSearchValue: CallableFunction;
  setGenreeSearch: CallableFunction;
}

const Search: FC<SearchProps> = ({ setSearchValue, setGenreeSearch }) => {
  const handleSearch = (ev: any) => {
    
    setSearchValue(ev.target.value);
  };


  return (
    <div className="search">
      <input
        onInput={handleSearch}
        className="search__input"
        type={"text"}
        placeholder={`Search`}
      />
      <h2 onClick={() => setGenreeSearch("Comedy")}>Comedy</h2>
      <h2 onClick={() => setGenreeSearch("Horror")}>Horror</h2>
      <h2 onClick={() => setGenreeSearch("Action")}>Action</h2>
    </div>
  );
};

export default Search;
