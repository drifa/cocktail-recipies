import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: '',
        errorMessage: '',
        didSignup: false,
    }
  }

  clearInputs = () => {
    this.setState(state => ({
        ...state,
        username: '',
        password: '',
        email: '',
        errorMessage: ''
    }));
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.context.signup(this.state)
      .then(() => {
        this.setState(state => ({
          ...state,
          didSignup: true,
        }))
      })
      .then(() => this.clearInputs())
      .catch(err => {
        this.setState(state => ({ ...state, errorMessage: err.data}))
    })
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState({ [name]: value });
    }
  }

  render() {
    if (this.state.didSignup) {
      return <Redirect to='/login'/>
    }
    return (
      <div>
        <h1>Welcome! please Sign up</h1>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
          </label>
          <label>
            Email:
            <input type="text" value={this.state.email} name="email" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {
            this.state.errorMessage &&
            <p style={{color: "red"}}>{this.state.errorMessage}</p>
        }
      </div>
    );
  }
}

export default Signup;
