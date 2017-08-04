import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { Grid, Row, Col } from 'react-bootstrap';
import results from './results.json';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchField: '',
      zipcode: '',
      radius: 20,
      results: []
    }
  }

  render() {
    return (
      <Grid>
        <Row>
          <SearchBar/>
        </Row>
        <Row>
          <SearchResults results={ results }/>
        </Row>
      </Grid>
    )
  }
}

export default Search;
