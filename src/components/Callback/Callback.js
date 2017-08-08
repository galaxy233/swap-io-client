import React, { Component } from 'react';
import Loader from 'halogen/FadeLoader';
import { getUser, createUser } from '../../services/user';
import './style.css'


class Callback extends Component {
  constructor(props) {
    super(props)
    this.state = {
      prompt: false,
      textField: ''
    }
  }

  updateTextField(val) {
    this.setState({
      textField: val
    })
  }

  handleSubmit() {

    createUser(this.state.textField).then(user => {
      if (user.id) {
        localStorage.setItem("username", user.username)
        this.props.history.replace('/profile')
      } else {
        alert("Username already exists")
        this.setState({
          textField: ''
        })
      }
    })
  }

  componentWillMount() {
    // Connect to DB and check if user exists, if they do redirect to profile
    // If not, ask for username and add user to database
    const { auth, history } = this.props;
    auth.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        auth.setSession(authResult);
        getUser().then(user => {
          if (user.id) {
            localStorage.setItem("username", user.username)
            localStorage.setItem("zipcode", user.zipcode)
            history.replace('/profile')
          } else {
            this.setState({
              prompt: true
            })
          }
        })
      } else if (err) {
        console.log(err);
      }
    });

  }

  render() {
    return (
      <div>
        {
          this.state.prompt &&
          <UsernameInput
            textField={this.state.textField}
            updateTextField={(val) => this.updateTextField(val)}
            handleSubmit={() => this.handleSubmit()}
          />
        }
      </div>
    )
  }
}

const UsernameInput = ({textField, updateTextField, handleSubmit}) => {
    return (
      <div className="username-box">
        <h2>Please enter a username to continue</h2>
        <input
          value={textField}
          onChange={(e) => updateTextField(e.target.value)}
          type="text"
          placeholder="Enter a username"
        />
        <button onClick={() => handleSubmit()}>Submit</button>
      </div>
    )
}

export default Callback;
