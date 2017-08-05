import React from 'react';
import FontAwesome from 'react-fontawesome';

const SearchBar = ({ toggleOptions, searchField, updateSearchField, handleSearch }) => {
  return (
    <div className="search-bar">
      <input
        type="text"
        value={ searchField }
        onChange={ (e) => updateSearchField(e.target.value) }/>
      <button onClick={ handleSearch }>Search</button>
      <FontAwesome onClick={ toggleOptions } name="cog"/>
    </div>
  )
}

export default SearchBar;
