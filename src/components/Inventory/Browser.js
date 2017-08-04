import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchItems } from '../../ducks/actions';
import FontAwesome from 'react-fontawesome';
import ScaleLoader from 'halogen/ScaleLoader';

const genGrid = (items) => {
  let rows = []
  let cols = []
  items.forEach(item => {
    if (cols.length === 3) {
      rows.push((
        <Row>
          { cols }
        </Row>
      ))
      cols = []
    }
    cols.push((
      <Col lg={4}>
        <Item name={ item.name } id={ item.id } image_url={ item.image1 }/>
      </Col>
    ))
  })
  if (cols.length) {
    rows.push((
      <Row>
        { cols }
      </Row>
    ))
  }
  return rows
}

class Browser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      page: 1
    }
  }

  componentDidMount() {
    this.props.fetchItems()
  }

  render() {
    return (
      <div>
        {
          this.props.isFetching
            ?
              <ScaleLoader color="black"/>
            :
            genGrid(this.props.items)
        }
        <Row>
          <Col lg={12}>
            <div className="fa-container">
              <FontAwesome name="arrow-circle-o-left" size="3x"/>
              <FontAwesome name="plus-circle" size="3x"/>
              <FontAwesome name="arrow-circle-o-right" size="3x"/>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const Item = ({ name, id, image_url }) => {
  return (
    <div className="inventory-item">
      <div>
        <div>
          { name }
        </div>
        <div>
          <Link to={`/inventory/edit/${id}`}>
            <FontAwesome name="minus-circle"/>
          </Link>

          <FontAwesome name="times-circle"/>
        </div>
      </div>
      <Thumbnail href="#" alt="171x180" src={ image_url }/>
    </div>
  )
}

export default connect(state => state, { fetchItems })(Browser);
