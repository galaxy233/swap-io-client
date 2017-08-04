import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchItems } from '../../services/item';
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
      items: [],
      page: 1
    }
  }

  componentDidMount() {
    fetchItems().then(items => {
      this.setState({items})
    })
  }

  render() {
    return (
      <div>
        {
          this.state.items.length
            ?
              genGrid(this.state.items)
            :
            <ScaleLoader color="black"/>
        }
        <Row>
          <Col lg={12}>
            <div className="fa-container">
              <FontAwesome name="arrow-circle-o-left" size="3x"/>
              <Link to="/inventory/new">
                <FontAwesome name="plus-circle" size="3x"/>
              </Link>
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

export default Browser;