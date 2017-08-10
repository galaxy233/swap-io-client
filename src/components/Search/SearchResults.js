import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap';
import picture from '../../assets/picture.png';
import { Link } from 'react-router-dom';

const SearchItem = ({ item }) => {
  return (
    <div className="search-item">
      <div>
        <div>
          <div className="img-container">
            {/* <Image src={ item.image1 } thumbnail /> */}
            <Image src={ picture } thumbnail />
          </div>
          <Link to={ `/item/${item.id}` }>
            <h4>{ item.name }</h4>
          </Link>
        </div>
        <h5>{ item.distance + " miles" }</h5>
        <h5>{ `Estimated value: $${item.usd_value}` }</h5>
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
