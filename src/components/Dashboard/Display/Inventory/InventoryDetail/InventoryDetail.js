import React, {Component} from 'react';
import axios from 'axios';
import Dropzone from 'react-dropzone';
import { uploadImage, newItem } from '../../../../../services/item'
import DetailsForm from './DetailsForm';
import {Row, Col} from 'react-bootstrap';

import picture from '../../../../../assets/picture.png';

import './InventoryDetail.css';

const ImagePreview = ({image_url}) => {
  return (
    <div className="image-preview">
      <img src={image_url}/>
    </div>
  )
}

class InventoryDetail extends Component {
  constructor(props) {
    super(props)
    const {name, description, condition, zipcode, image_url} = this.props.selectedItem;
    this.state = {
      name: name,
      description: description,
      condition: condition,
      zipcode: zipcode,
      image_url: image_url || picture,
      toUpload: null
    }
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

  commitToDb() {
    let item = {
      name: this.state.name,
      description: this.state.description,
      condition: this.state.condition,
      zipcode: this.state.zipcode,
      image_url: this.state.image_url
    }
    newItem(item).then(res => console.log(res));
  }

  handleSubmit() {
    // Check if we need to upload an image to S3.
    // Get the URL of the uploaded file, and update the database with the new information.
    if (this.state.toUpload) {
      uploadImage(this.state.toUpload)
      .then(image_url => {
        this.setState({
          image_url
        })
        this.commitToDb()
      })
    } else {
      this.commitToDb()
    }
  }

  onDrop(accepted, rejected) {
    if (accepted.length) {
      this.setState({
        toUpload: accepted[0],
        image_url: accepted[0].preview
      })
    }
  }

  render() {

    return (
      <div className="inventory-detail">

        <Row className="show-grid">
          <Col smHidden xsHidden md={12} lg={12}>
            <Dropzone accept="image/jpeg, image/png" onDrop={(accepted, rejected) => this.onDrop(accepted, rejected)} style={{
              width: "100%",
              height: "250px",

            }}>
              <ImagePreview image_url={this.state.image_url}/>
            </Dropzone>
          </Col>
        </Row>
        <Row className="show-grid">
          <DetailsForm
            name={this.state.name}
            description={this.state.description}
            condition={this.state.condition}
            zipcode={this.state.zipcode}
            updateName={ (val) => this.updateName(val) }
            updateDesc={ (val) => this.updateDesc(val) }
            updateCondition={ (val) => this.updateCondition(val) }
            updateZipcode={ (val) => this.updateZipcode(val) }
            handleSubmit={ () => this.handleSubmit() }
          />
        </Row>

      </div>
    )
  }
}

export default InventoryDetail;
