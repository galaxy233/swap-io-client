import React from 'react';

import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

import { TextForm, NumberForm } from '../shared';

const DescriptionForm = ({ description, updateDesc }) => (
  <FormGroup>
    <ControlLabel>Description</ControlLabel>
    <FormControl componentClass="textarea"
      value={ description }
      onChange={ (e) => updateDesc(e.target.value) }
    />
  </FormGroup>
)

const ConditionForm = ({ condition, updateCondition }) => (
  <FormGroup>
    <ToggleButtonGroup
      onChange={ (e) => updateCondition(e) }
      type="radio"
      name="condition"
      defaultValue={ condition }
      >
      <ToggleButton value="New">
        New
      </ToggleButton>
      <ToggleButton value="Used">
        Used
      </ToggleButton>
    </ToggleButtonGroup>
  </FormGroup>
)


const Form = (props) => (
  <form>
    <TextForm
      label="Name"
      value={ props.name }
      updateValue={ props.updateName }
    />
    <DescriptionForm
      description={ props.description }
      updateDesc={ props.updateDesc }
    />
    <ConditionForm
      condition={ props.condition }
      updateCondition={ props.updateCondition }
    />
    <NumberForm
      label="Zipcode"
      value={ props.zipcode }
      updateValue={ props.updateZipcode }
    />
    <NumberForm
      label="USD Value"
      value={ props.usd_value }
      updateValue={ props.updateUSDValue }
    />
    <Button onClick={ props.handleSubmit } >Submit</Button>
  </form>
)

export default Form;
