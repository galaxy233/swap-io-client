import React, { Component } from 'react';
import { Grid, Row, Col, Thumbnail } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { fetchItems, deleteItem } from '../../services/item';
import FontAwesome from 'react-fontawesome';
import Loader from 'halogen/FadeLoader';
import { getImageResized } from '../../services/image';

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
            <Row>

                {
                  this.state.items.map(item => (
                    <Col lg={3} md={3} sm={4} xs={12}>
                      <Item
                        name={ item.name }
                        id={ item.id }
                        image_url={ getImageResized(500,300,item.image1) }
                        handleDelete={ this.handleDelete }
                      />
                    </Col>
                  ))
                }

            </Row>
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

        <div className="fa-container">
          <Link to="/inventory/new">
            <FontAwesome name="plus-circle" size="3x"/>
          </Link>
        </div>
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
