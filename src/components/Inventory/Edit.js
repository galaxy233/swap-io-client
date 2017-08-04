import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

import Form from './Form';
import ImageForm from './ImageForm';

import { uploadImage, newItem, updateItem, fetchItems, fetchItem } from '../../services/item';
import genAlert from './Alerts.js';

class Edit extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      description: '',
      condition: 'New',
      zipcode: '',
      images: new Array(4),
      selectedImage: 0,
      toUpload: new Array(4),
      alert: null
    }

    this.updateName = this.updateName.bind(this)
    this.updateDesc = this.updateDesc.bind(this)
    this.updateCondition = this.updateCondition.bind(this)
    this.updateZipcode = this.updateZipcode.bind(this)
    this.updateSelectedImage = this.updateSelectedImage.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.onDrop = this.onDrop.bind(this)
  }

  updateName(val) {
    this.setState({
      name: val
    })
  }

  updateDesc(val) {
    this.setState({
      description: val
    })
  }

  updateCondition(val) {
    this.setState({
      condition: val
    })
  }

  updateZipcode(val) {
    this.setState({
      zipcode: val
    })
  }

  updateSelectedImage(val) {
    this.setState({
      selectedImage: val
    })
  }

  onDrop(accepted, rejected, zone) {
    if (accepted.length) {
      let images = this.state.images.slice()
      let toUpload = this.state.toUpload.slice()
      images[zone] = accepted[0].preview
      toUpload[zone] = accepted[0]
      this.setState({
        images,
        toUpload
      })
    }
  }

  handleSubmit() {
    let toUpload = this.state.toUpload.map(file => {
      if (file) {
        return uploadImage(file)
      }
    })
    Promise.all(toUpload).then(values => {
      let images = this.state.images.slice()
      values.forEach((url, idx) => {
        if (url) {
          images[idx] = url
        }
      })
      this.setState({
        images,
        toUpload: new Array(4)
      })
      this.commitToDb()
    })
  }

  commitToDb() {
    let item = {
      name: this.state.name,
      description: this.state.description,
      condition: this.state.condition,
      zipcode: this.state.zipcode,
      image1: this.state.images[0],
      image2: this.state.images[1],
      image3: this.state.images[2],
      image4: this.state.images[3]
    }
    if (this.props.editMode) {
      updateItem(item, this.props.match.params.id)
        .then(() => {
          this.setState({alert:"edit"})
          setTimeout(() => this.props.history.replace("/inventory"), 1500)
        })
        .catch(() => this.setState({alert:"fail"}))
    } else {
      newItem(item)
        .then(() => {
          this.setState({alert:"success"})
          setTimeout(() => this.props.history.replace("/inventory"), 1500)
        })
        .catch(() => this.setState({alert:"fail"}))
    }

  }

  componentDidMount() {
    if (this.props.editMode) {
      fetchItem(this.props.match.params.id)
      .then(item => {
        this.setState({
          name: item.name,
          description: item.description,
          condition: item.condition,
          zipcode: item.zipcode,
          images: [item.image1, item.image2, item.image3, item.image4]
        })
      })
    }
  }

  render() {
    return (
        <Row>
          <Col lg={4}>
            <ImageForm
              images={this.state.images}
              selectedImage={this.state.selectedImage}
              updateSelectedImage={this.updateSelectedImage}
              onDrop={this.onDrop}
            />
          </Col>
          <Col lg={8}>
            {
              genAlert(this.state.alert)
            }
            <Form
              name={this.state.name}
              updateName={this.updateName}
              description={this.state.description}
              updateDesc={this.updateDesc}
              condition={this.state.condition}
              updateCondition={this.updateCondition}
              zipcode={this.state.zipcode}
              updateZipcode={this.updateZipcode}
              handleSubmit={this.handleSubmit}
            />
          </Col>
        </Row>
    )
  }
}

export default Edit;
