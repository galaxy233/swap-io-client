import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail, Button } from 'react-bootstrap';

import './style.css';

const items = require('./items.json')

const genGrid = (items) => {
  const rows = [];
  for (var i=0; i<3; i++) {
    let cols = [];
    cols.push(<Col lg={4}><Item image_url={ items[i*3].image_url } name={ items[i*3].name }/></Col>)
    cols.push(<Col lg={4}><Item image_url={ items[i*3+1].image_url } name={ items[i*3+1].name }/></Col>)
    cols.push(<Col lg={4}><Item image_url={ items[i*3+2].image_url } name={ items[i*3+2].name }/></Col>)
    rows.push((
      <Row className="show-grid">
        { cols }
      </Row>
    ))
  }
  return (
    <Grid>
      { rows }
    </Grid>
  )
}

const TopBar = () => {
  return (
    <div className="top-bar"></div>
  )
}

const ItemName = ({ name }) => {
  return (
    <div className="item-name">
      { name }
    </div>
  )
}

const Item = ({ name, image_url }) => {
  return (
    <div className="item">
      <ItemName name={ name }/>
      <img src={ image_url }/>
    </div>
  )
}

const ItemBox = () => {
  return genGrid(items)
}


const Items = () => {
  return (
    <div>
      <TopBar/>
      <ItemBox/>
      <ItemBox/>
    </div>
  )
}

export default Items;
