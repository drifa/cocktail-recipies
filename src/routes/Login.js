import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const url = 'http://localhost:5000/login';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      token: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    const { name, value } = event.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  handleClick(event) {
    event.preventDefault();
    console.log("username: ",this.state);
    fetch(url, {
      method: 'POST',
      headers : new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ username: this.state.username, password: this.state.password})
    }).then(async response => {
      console.log(await response.json());
    })
  }

  render() {
    return (
      <div>
        <h1>Welcome! please login</h1>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
          </label>
          <button onClick={this.handleClick}>Submit</button>
        </form>
      </div>
    )
  }
}

export default Login
