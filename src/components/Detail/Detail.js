import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import ScaleLoader from 'halogen/ScaleLoader';
import ImageSelect from './ImageSelect';

import item from './item.json';
import './Detail.css';

const images = ['https://images-na.ssl-images-amazon.com/images/I/41K32T04S3L.jpg','https://swap-io.s3.amazonaws.com/1897-2__.jpg','https://swap-io.s3.amazonaws.com/apollocoin.png','https://swap-io.s3.amazonaws.com/1w8VyzK.jpg']

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0
    }
    this.updateSelectedImage = this.updateSelectedImage.bind(this)
  }

  updateSelectedImage(idx) {
    this.setState({selectedImage:idx})
  }

  componentDidMount() {
    return 0
  }

  render() {
    return (
      <DetailView
        item={ item }
        selectedImage={ this.state.selectedImage }
        updateSelectedImage={ this.updateSelectedImage }
      />
    )
  }
}

const DetailView = ({ item, selectedImage, updateSelectedImage }) => {

  // let images = [item.images1, item.image2, item.image3, item.image4]

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
    <div>
      <button>Contact</button>
      <button>Trade</button>
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
