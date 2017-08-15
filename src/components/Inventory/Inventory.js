import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import { Grid, Row } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Browser from './Browser';
import Edit from './Edit';
import { Header } from '../shared';

import './Inventory.sass';

class Inventory extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Grid fluid className="swap-container">
        <Row className="show-grid">
          <Header name="Inventory"/>
        </Row>
        <Route exact path="/inventory" component={ Browser }/>
        <Route path="/inventory/new" component={ Edit }/>
        <Route path="/inventory/edit/:id" render={ (props) => <Edit editMode={true} {...props} /> }/>
      </Grid>
    )
  }
}

export default Inventory;
