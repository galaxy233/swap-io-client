import React, { Component } from 'react';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';
import { Grid, Row, Col } from 'react-bootstrap';
import { searchItems } from '../../services/search';
import results from './results.json';

import './Search.css';

class Search extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchField: '',
      zipcode: '',
      radius: 20,
      results: [],
      showOptions: false
    }
    this.updateSearchField = this.updateSearchField.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
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

  toggleOptions() {
    this.setState({showOptions:!this.state.showOptions})
  }

  handleSearch() {
    let keywords = this.state.searchField
    let { radius, zipcode } = this.state
    searchItems(keywords, zipcode, radius)
    .then(results => {
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

const Options = ({ zipcode, radius, updateZipcode, updateRadius }) => {
  return (
    <div className="search-options">
      <label>Zipcode
        <input value={ zipcode } type="text" onChange={ (e) => updateZipcode(e.target.value) }/></label>
      <label>Radius
        <input value={ radius } type="text" onChange={ (e) => updateRadius(e.target.value) }/></label>
    </div>
  )
}

export default Search;
