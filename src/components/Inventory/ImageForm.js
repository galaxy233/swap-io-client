import React from 'react';
import { FormGroup, ControlLabel, FormControl, Row, Col, Thumbnail } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import picture from '../../assets/picture.png';
import { getImageResized } from '../../services/image';

const SelectedImage = ({ image_url }) => {
  return (
    <div className="selected-image">
      <img src={ image_url || picture } rounded/>
    </div>
  )
}

const ImageForm = ({ images, selectedImage, updateSelectedImage, onDrop }) => {
  return (
    <div>
      <SelectedImage image_url={ getImageResized(500,500,images[selectedImage]) }/>
      <Row>
        <Col lg={6} md={6} sm={6} className="hidden-xs">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png"
            onDrop={(accepted, rejected, zone) => onDrop(accepted, rejected, 0)}>
            <img src={ getImageResized(500,500,images[0]) || picture }/>
          </Dropzone>
        </Col>
        <Col lg={6} md={6} sm={6} className="hidden-xs">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png"
            onDrop={(accepted, rejected, zone) => onDrop(accepted, rejected, 1)}>
            <img src={ getImageResized(500,500,images[1]) || picture }/>
          </Dropzone>
        </Col>
      </Row>
      <Row>
        <Col lg={6} md={6} sm={6} className="hidden-xs">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png"
            onDrop={(accepted, rejected, zone) => onDrop(accepted, rejected, 2)}>
            <img src={ getImageResized(500,500,images[2]) || picture }/>
          </Dropzone>
        </Col>
        <Col lg={6} md={6} sm={6} className="hidden-xs">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png"
            onDrop={(accepted, rejected, zone) => onDrop(accepted, rejected, 3)}>
            <img src={ getImageResized(500,500,images[3]) || picture }/>
          </Dropzone>
        </Col>
      </Row>


    </div>
  )
}

export default ImageForm;
