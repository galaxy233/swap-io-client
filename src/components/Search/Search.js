import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { Grid, Row, Col, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import { searchItems } from '../../services/search';
import results from './results.json';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchField: '',
      zipcode: localStorage.getItem("zipcode") || '',
      radius: 500,
      results: [],
      showOptions: false,
      sortBy: 'distance asc'
    }
    this.updateSearchField = this.updateSearchField.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateSortBy = this.updateSortBy.bind(this)
    this.updateRadius = this.updateRadius.bind(this)
    this.toggleOptions = this.toggleOptions.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  updateSearchField(val) {
    this.setState({searchField:val})
  }

  updateZipcode(val) {
    this.setState({zipcode:val})
  }

  updateRadius(val) {
    this.setState({radius:val})
  }

  updateSortBy(val) {
    this.setState({sortBy:val})
  }

  toggleOptions() {
    this.setState({showOptions:!this.state.showOptions})
  }

  handleSearch() {
    let keywords = this.state.searchField
    let { radius, zipcode, sortBy } = this.state
    searchItems(keywords, zipcode, radius, sortBy)
    .then(results => {
      console.log(results);
      this.setState({results})
    })
  }

  render() {
    return (
      <Grid>
        <Row>
          <SearchBar
            toggleOptions={ this.toggleOptions }
            searchField={ this.state.searchField }
            updateSearchField={ this.updateSearchField }
            handleSearch={ this.handleSearch }
          />
          {
            this.state.showOptions &&
            <Options
              zipcode={ this.state.zipcode }
              radius={ this.state.radius }
              sortBy={ this.state.sortBy }
              updateSortBy={ this.updateSortBy }
              updateZipcode={ this.updateZipcode }
              updateRadius={ this.updateRadius }
            />
          }
        </Row>
        <Row>
          <SearchResults results={ this.state.results }/>
        </Row>
      </Grid>
    )
  }
}

const SelectForm = ({ updateSortBy }) => (
  <select onChange={ (e) => updateSortBy(e.target.value) }>
    <option value="distance asc">Distance (shortest)</option>
    <option value="distance desc">Distance (greatest)</option>
    <option value="value asc">USD Value (lowest)</option>
    <option value="value desc">USD Value (highest)</option>
  </select>
)


const Options = ({ zipcode, radius, updateZipcode, updateRadius, updateSortBy }) => {
  return (
    <div className="search-options">
      <label>Zipcode
        <input value={ zipcode } type="number" onChange={ (e) => updateZipcode(e.target.value) }/></label>
      <label>Radius
        <input value={ radius } type="number" onChange={ (e) => updateRadius(e.target.value) }/></label>
      <label>Sort By
        <SelectForm updateSortBy={ updateSortBy }/></label>
    </div>
  )
}

export default Search;
