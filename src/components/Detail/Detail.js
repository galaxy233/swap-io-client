import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { fetchItem } from '../../services/item';
import ScaleLoader from 'halogen/ScaleLoader';
import ImageSelect from './ImageSelect';
import { TradeModal } from './TradeModal';

import item from './item.json';
import './Detail.css';

class Detail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedImage: 0,
      item: {},
      showModal: false
    }
    this.updateSelectedImage = this.updateSelectedImage.bind(this)
    this.openModal = this.openModal.bind(this)
    this.closeModal = this.closeModal.bind(this)
  }

  updateSelectedImage(idx) {
    this.setState({selectedImage:idx})
  }

  openModal() {
    this.setState({showModal:true})
  }

  closeModal() {
    this.setState({showModal:false})
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
            showModal={ this.state.showModal }
            openModal={ this.openModal }
            closeModal={ this.closeModal }
          />
        }
      </div>
    )
  }
}

const DetailView = ({ item, selectedImage, updateSelectedImage, showModal, openModal, closeModal }) => {

  let images = [item.image1, item.image2, item.image3, item.image4]

  return (
    <Grid>
      <Row>
        <TradeModal
          showModal={ showModal }
          openModal={ openModal }
          closeModal={ closeModal }
          item_id={ item.id }
        />
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
          <Contact openModal={ openModal }/>
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

const Contact = ({ openModal }) => {
  return (
    <div className="item-contact">
      <div>Contact</div>
      <div onClick={ openModal }>Trade</div>
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
