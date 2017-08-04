import React from 'react';

import { FormGroup, ControlLabel, FormControl, Button } from 'react-bootstrap';
import ToggleButtonGroup from 'react-bootstrap/lib/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/lib/ToggleButton';

const NameForm = ({ name, updateName }) => {
  return (
    <FormGroup>
      <ControlLabel>Name</ControlLabel>
      <FormControl
        type="text"
        value={ name }
        onChange={ (e) => updateName(e.target.value) }
      />
    </FormGroup>
  )
}

const DescriptionForm = ({ description, updateDesc }) => {
  return (
    <FormGroup>
      <ControlLabel>Description</ControlLabel>
      <FormControl componentClass="textarea"
        value={ description }
        onChange={ (e) => updateDesc(e.target.value) }
      />
    </FormGroup>
  )
}

const ConditionForm = ({ condition, updateCondition }) => {
  return (
    <FormGroup>
      <ToggleButtonGroup onChange={ (e) => updateCondition(e) } type="radio" name="condition" defaultValue={ condition }>
        <ToggleButton value="New">
          New
        </ToggleButton>
        <ToggleButton value="Used">
          Used
        </ToggleButton>
      </ToggleButtonGroup>
    </FormGroup>
  )
}

const ZipcodeForm = ({ zipcode, updateZipcode }) => {
  return (
    <FormGroup>
      <ControlLabel>Zipcode</ControlLabel>
      <FormControl
        type="text"
        value={ zipcode }
        onChange={ (e) => updateZipcode(e.target.value) }
      />
    </FormGroup>
  )
}

const Form = (props) => {
  return (
    <form>
      <NameForm
        name={ props.name }
        updateName={ props.updateName }
      />
      <DescriptionForm
        description={ props.description }
        updateDesc={ props.updateDesc }
      />
      <ConditionForm
        condition={ props.condition }
        updateCondition={ props.updateCondition }
      />
      <ZipcodeForm
        zipcode={ props.zipcode }
        updateZipcode={ props.updateZipcode }
      />
      <Button onClick={ () => props.handleSubmit() } >Submit</Button>
    </form>
  )
}

export default Form;
