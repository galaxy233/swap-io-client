import React from 'react';
import { FormGroup, ControlLabel, FormControl, Button, Col } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

const DetailsForm = (props) => {
  return (
    <Col lg={12}>
      <form>
        <FormGroup>
          <ControlLabel>Name</ControlLabel>
          <FormControl
            type="text"
            value={ props.name }
            onChange={ (e) => props.updateName(e.target.value) }
          />
        </FormGroup>
        <FormGroup>
          <ToggleButtonGroup onChange={ (e) => props.updateCondition(e) } type="radio" name="condition" defaultValue={ props.condition }>
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
            value={ props.description }
            onChange={ (e) => props.updateDesc(e.target.value) }
          />
        </FormGroup>
        <FormGroup>
          <ControlLabel>Zipcode</ControlLabel>
          <FormControl
            type="text"
            value={ props.zipcode }
            onChange={ (e) => props.updateZipcode(e.target.value) }
          />
        </FormGroup>
        <Button onClick={ () => props.handleSubmit() } >Submit</Button>
      </form>
    </Col>
  )
}

export default DetailsForm;
