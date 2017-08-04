import React from 'react';
import { Alert } from 'react-bootstrap';

const AlertAdd = (
  <Alert bsStyle="success">
    Item added to inventory successfully.
  </Alert>
)

const AlertEdit = (
  <Alert bsStyle="warning">
    Item edited successfully.
  </Alert>
)

const AlertFail = (
  <Alert bsStyle="danger">
    Item was not added/edited successfully
  </Alert>
)

const genAlert = (type) => {
  switch (type) {
    case "success":
      return AlertAdd
    case "edit":
      return AlertEdit
    case "fail":
      return AlertFail
    default:
      return null
  }
}

export default genAlert;
