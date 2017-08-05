import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <div className="search-item">
      <div>
        <div>
          <div className="img-container">
            <Image src={ item.image1 } thumbnail />
          </div>
          <Link to={ `/item/${item.id}` }>
            <h4>{ item.name }</h4>
          </Link>
        </div>
        <h5>{ item.distance + " miles" }</h5>
      </div>
    </div>
  )
}

const SearchResults = ({ results }) => {
  let items = results.map(item => <SearchItem item={ item }/>)
  return (
    <div className="search-results">
      { items }
    </div>
  )
}

export default SearchResults;
