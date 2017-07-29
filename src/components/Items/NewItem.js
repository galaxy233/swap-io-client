import React, { Component } from 'react';
import { Button, FormGroup, ControlLabel, FormControl } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';
import {newItem} from '../../services/item';

import './style.css';

class NewItem extends Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      condition: "New",
      description: '',
      image_url: '',
      zipcode: ''
    }
  }

  updateName(val) {
    this.setState({
      name: val
    })
  }

  updateCondition(val) {
    this.setState({
      condition: val
    })
  }

  updateDesc(val) {
    this.setState({
      description: val
    })
  }

  updateImage(val) {
    this.setState({
      image_url: val
    })
  }

  updateZipcode(val) {
    this.setState({
      zipcode: val
    })
  }

  handleSubmit() {
    newItem(this.state).then(res => {
      console.log(res.data);
    })
  }


  render() {
    return (
      <div className="new-item">
        <form>
          <FormGroup controlId="formBasicText">
            <ControlLabel>Name</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.name }
              onChange={ (e) => this.updateName(e.target.value) }
            />
          </FormGroup>
          <FormGroup>
            <ToggleButtonGroup onChange={ (e) => this.updateCondition(e) } type="radio" name="condition" defaultValue={ this.state.condition }>
              <ToggleButton value="New">
                New
              </ToggleButton>
              <ToggleButton value="Used">
                Used
              </ToggleButton>
            </ToggleButtonGroup>
          </FormGroup>
          <FormGroup>
            <ControlLabel>Description</ControlLabel>
            <FormControl componentClass="textarea"
              value={ this.state.desc }
              onChange={ (e) => this.updateDesc(e.target.value) }
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Location</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.zipcode }
              onChange={ (e) => this.updateZipcode(e.target.value) }
            />
          </FormGroup>
          <FormGroup>
            <ControlLabel>Image URL</ControlLabel>
            <FormControl
              type="text"
              value={ this.state.image_url }
              onChange={ (e) => this.updateImage(e.target.value) }
            />
          </FormGroup>
          <img src={ this.state.image }/>
          <Button onClick={ () => this.handleSubmit() } >Submit</Button>
        </form>
      </div>
    )
  }
}

export default NewItem;
