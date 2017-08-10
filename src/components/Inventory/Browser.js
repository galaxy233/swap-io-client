import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../../services/item';
import FontAwesome from 'react-fontawesome';
import Loader from 'halogen/FadeLoader';

const genGrid = (items, handleDelete) => {
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
        <Item
          name={ item.name }
          id={ item.id }
          image_url={ item.image1 }
          handleDelete={ handleDelete }
        />
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
    this.state = {}
    this.handleDelete = this.handleDelete.bind(this)
  }

  componentDidMount() {
    fetchItems().then(items => {
      this.setState({items})
    })
  }

  handleDelete(id) {
    deleteItem(id).then(() => {
      fetchItems().then(items => {
        this.setState({items})
      })
    })
  }

  render() {
    return (
      <div className="browser">
        {
          this.state.items
            ?
            this.state.items.length
            ?
            genGrid(this.state.items, this.handleDelete)
            :
            <p>No items found. Click below to add a new item!</p>
          :
          <div className="loader">
            <Loader color="#1aa9bc"/>
            <p>
              Loading items...
            </p>
          </div>
        }
        <Row>
          <Col lg={12}>
            <div className="fa-container">
              {/* <FontAwesome name="arrow-circle-o-left" size="3x"/> */}
              <Link to="/inventory/new">
                <FontAwesome name="plus-circle" size="3x"/>
              </Link>
              {/* <FontAwesome name="arrow-circle-o-right" size="3x"/> */}
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}

const Item = ({ name, id, image_url, handleDelete }) => {
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

          <FontAwesome onClick={ () => handleDelete(id) } name="times-circle"/>
        </div>
      </div>
      <Thumbnail href="#" alt="171x180" src={ image_url }/>
    </div>
  )
}

export default Browser;
