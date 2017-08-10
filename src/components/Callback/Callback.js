import React, { Component } from 'react';
import Loader from 'halogen/FadeLoader';
import { Button } from 'react-bootstrap';
import DebounceInput from 'react-debounce-input';
import { getUser, createUser, getZipcode, checkUsername } from '../../services/user';
import './style.css';

import Auth from '../../services/auth';
const auth = new Auth();


class Callback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: false,
      textField: '',
      zipcode: '',
      usernameAvailable: null
    }
    this.updateTextField = this.updateTextField.bind(this);
    this.updateZipcode = this.updateZipcode.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  updateTextField(val) {
    this.setState({
      textField: val
    })
    checkUsername(this.state.textField)
    .then(usernameAvailable => {
      this.setState(usernameAvailable)
    })
  }

  updateZipcode(val) {
    this.setState({
      zipcode: val
    })
  }

  componentDidMount() {
    auth.handleAuth().then(() => {
      getUser().then(user => {
        if (user.id) {
          localStorage.setItem("username", user.username)
          localStorage.setItem("zipcode", user.zipcode)
          this.props.history.replace('/profile')
        } else {
          getZipcode.then(zipcode => {
            this.setState({
              zipcode,
              prompt:true
            })
          })
        }
      })
    })
  }

  handleSubmit() {
    createUser(this.state.textField, this.state.zipcode).then(user => {
      if (user.id) {
        localStorage.setItem("username", user.username)
        localStorage.setItem("zipcode", user.zipcode)
        this.props.history.replace('/profile')
      } else {
        alert("Username already exists")
        this.setState({
          textField: ''
        })
      }
    })
  }

  render() {
    return (
          <div className="user-info-box">
            {
              this.state.prompt
              ?
              <UsernameInput
                textField={this.state.textField}
                zipcode={this.state.zipcode}
                updateZipcode={this.updateZipcode}
                updateTextField={this.updateTextField}
                handleSubmit={this.handleSubmit}
                usernameAvailable={this.state.usernameAvailable}
              />
              :
              <div className="loader">
                <Loader color="white"/>
                <p>
                  Please wait while we setup your account...
                </p>
              </div>
            }
          </div>
    )
  }
}

const UsernameInput = ({textField, zipcode, updateZipcode, updateTextField, handleSubmit, usernameAvailable}) => {
    return (
      <div className="username-box">
        <h1>Just a few more things...</h1>

          <DebounceInput
            minLength={4}
            debounceTimeout={300}
            onChange={(e) => updateTextField(e.target.value)}
            placeholder="Enter a username"
            className={ usernameAvailable === false ? "invalid" : "" }
          />

          {
            usernameAvailable !== null
            ?
            <p>{ usernameAvailable ? "Username available" : "Username not available" }</p>
            :
            null
          }

        <br/>

          <input
            value={zipcode}
            onChange={(e) => updateZipcode(e.target.value)}
            type="text"
            placeholder="Enter your zipcode"
          />
          <Button onClick={handleSubmit} bsStyle="primary">Submit</Button>
      </div>
    )
}

export default Callback;
