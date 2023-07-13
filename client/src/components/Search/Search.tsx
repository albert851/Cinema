import React, { FC, useState, useEffect} from 'react'

const Search = () => {

  const handleSearch = () => {

  }

  return (
    <div className='search'>
      <input
        onInput={handleSearch}
        className="search__input"
        type={"text"}
        placeholder={`Search`}
      />
      <h2>Comedy</h2>
      <h2>Horror</h2>
      <h2>Action</h2>
    </div>
  )
}

export default Search