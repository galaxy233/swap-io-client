import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { fetchItem } from '../../services/item';
import ScaleLoader from 'halogen/ScaleLoader';
import ImageSelect from './ImageSelect';

import item from './item.json';
import './Detail.css';

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0,
      item: {}
    }
    this.updateSelectedImage = this.updateSelectedImage.bind(this)
  }

  updateSelectedImage(idx) {
    this.setState({selectedImage:idx})
  }

  componentDidMount() {
    fetchItem(this.props.match.params.id)
    .then(item => this.setState({item}))
  }

  render() {
    return (
      <div>
        {
          this.state.item.name &&
          <DetailView
            item={ this.state.item }
            selectedImage={ this.state.selectedImage }
            updateSelectedImage={ this.updateSelectedImage }
          />
        }
      </div>
    )
  }
}

const DetailView = ({ item, selectedImage, updateSelectedImage }) => {

  let images = [item.image1, item.image2, item.image3, item.image4]

  return (
    <Grid>
      <Row>
        <Col lg={6}>
          <div className="item-images">
            <SelectedImage image_url={ images[selectedImage] }/>
            <ImageSelect
              images={ images }
              updateSelectedImage={ updateSelectedImage }
              selectedImage={ selectedImage }
            />
          </div>
        </Col>
        <Col lg={6}>
          <Info item={ item }/>
          <Contact/>
        </Col>
      </Row>
    </Grid>
  )
}

const Info = ({ item }) => {
  return (
    <div className="item-info">
      <h2>{ item.name }</h2>
      <div className="item-description">
        { item.description }
      </div>
      <div className="item-details">
        <div>{ item.condition }</div>
        <div>{ item.zipcode }</div>
      </div>
    </div>
  )
}

const Contact = () => {
  return (
    <div className="item-contact">
      <div>Contact</div>
      <div>Trade</div>
    </div>
  )
}

const SelectedImage = ({ image_url }) => {
  return (
    <div className="selected-image">
      <Image src={ image_url } thumbnail />
    </div>
  )
}

export default Detail;
