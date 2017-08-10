import React from 'react';
import { FormGroup, ControlLabel, FormControl } from 'react-bootstrap';

export const TextForm = ({ label, value, updateValue }) => (
  <FormGroup>
    <ControlLabel>{ label }</ControlLabel>
    <FormControl
      type="text"
      value={ value }
      onChange={ (e) => updateValue(e.target.value) }
    />
  </FormGroup>
)

export const NumberForm = ({ label, value, updateValue }) => (
  <FormGroup>
    <ControlLabel>{ label }</ControlLabel>
    <FormControl
      type="number"
      value={ value }
      onChange={ (e) => updateValue(e.target.value) }
    />
  </FormGroup>
)
