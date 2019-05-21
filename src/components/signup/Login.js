import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        errorMessage: ''
    }
  }

  clearInputs = () => {
    this.setState({
        username: '',
        password: '',
        errorMessage: ''
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.context
        .login({
            username: this.state.username,
            password: this.state.password,
        })
        .then(() => this.clearInputs())
        .catch(err => {
            this.setState(state => {
                return {
                    ...state,
                    errorMessage: err.response.data.error
                }
            });
        })
  }

  handleChange = (e) => {
    const { name, value } = e.target;

    if (name) {
      this.setState(state => {
        return {
            ...state,
            [name]: value,
        };
      });
    }
  }

  render() {
    if (this.props.context.token) {
        return <Redirect to='/' />
    }
    return (
      <div>
        <h1>Welcome! please Login</h1>
        <form>
          <label>
            Username:
            <input type="text" value={this.state.username} name="username" onChange={this.handleChange} />
          </label>
          <label>
            Password:
            <input type="password" value={this.state.password} name="password" onChange={this.handleChange} />
          </label>
          <button onClick={this.handleSubmit}>Submit</button>
        </form>
        {
            this.state.errorMessage &&
            (<p style={{color: "red"}}>{this.state.errorMessage}</p>)
        }
      </div>
    );
  }
}

export default Login;
