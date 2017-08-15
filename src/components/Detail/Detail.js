import React, { Component } from 'react';
import { Grid, Col, Row, Image } from 'react-bootstrap';
import { fetchItem } from '../../services/item';
import { getImageResized } from '../../services/image';
import ScaleLoader from 'halogen/ScaleLoader';
import ImageSelect from './ImageSelect';
import { TradeModal } from './TradeModal';
import FontAwesome from 'react-fontawesome';

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
  const images = [item.image1, item.image2, item.image3, item.image4]
  .map(image => getImageResized(1170, 350,image))
  .filter(image => image)
  return (
  <Grid fluid>
    <Row>
      <TradeModal
      showModal={ showModal }
      openModal={ openModal }
      closeModal={ closeModal }
      item_id={ item.id }
    />
    <SelectedImage image_url={ images[selectedImage] }/>
    <div style={{textAlign:"center"}}>
      <ImageSelect
        images={ images }
        updateSelectedImage={ updateSelectedImage }
        selectedImage={ selectedImage }
      />
    </div>
    <div className="item-details">
      <div>
        <h1>{ item.name }</h1>
        <p>{ item.description }</p>
        <div className="social-media">
          <FontAwesome name="twitter" size="4x"/>
          <FontAwesome name="facebook" size="4x"/>
          <FontAwesome name="instagram" size="4x"/>
        </div>
      </div>
      <iframe
        width={"333"}
        height={"250"}
        frameBorder={"0"} style={{"border":"0"}}
        src={"https://www.google.com/maps/embed/v1/place?key=AIzaSyA7nSVnMtpMyU4WynRg0fPBuD8BcDYYbck&q=84109"}
        allowFullScreen>
      </iframe>
    </div>
      <Contact openModal={ openModal }/>
    </Row>
  </Grid>
  )
}

const Info = ({ item }) => {
  return (
    <div className="item-info">
      <h1>{ item.name }</h1>
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
    <div className="detail-selected-image">
      <Image src={ image_url } thumbnail />
    </div>
  )
}

export default Detail;
