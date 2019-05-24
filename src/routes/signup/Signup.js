import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Grid, Paper, Button, TextField, Typography } from '@material-ui/core';
import theme from '../../Theme';

import './register.scss';


export class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
        username: '',
        password: '',
        email: '',
        errors: [],
        didSignup: false,
    }
  }

  clearInputs = () => {
    this.setState(state => ({
        ...state,
        username: '',
        password: '',
        email: '',
        errors: []
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
        this.setState(state => ({
          ...state,
          errors: err.response.data.errors,
        }))
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
      <div className='main-div'>
        <MuiThemeProvider theme={theme}>
          <Paper className='register-paper'>
            <Grid container spacing={40} direction='column' justify='center' alignItems='center'>
              <Grid item>
                <Typography variant='h4' color='secondary'>
                  Welcome to Cocktail Recipes
                </Typography>
              </Grid>

              <Grid item>
                <Typography variant='h5' color='secondary'>
                  Please Sign up
                </Typography>
              </Grid>

              <Grid item>
                <Grid container spacing={40}  direction='row' justify='flex-start' alignItems='center' alignContent='center'>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="username-input"
                      label="Username"
                      value={this.state.username}
                      name="username"
                      onChange={this.handleChange}
                      margin="normal"
                      color='secondary'
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      className="password-input"
                      label="Email"
                      value={this.state.email}
                      name="email"
                      onChange={this.handleChange}
                      margin="normal"
                      color='secondary'
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      id="password-input"
                      label="Password"
                      type="password"
                      value={this.state.password}
                      name="password"
                      onChange={this.handleChange}
                      margin="normal"
                      color='secondary'
                    />
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Button type='submit' variant="contained" color="secondary" onClick={this.handleSubmit}>Sign up</Button>
                {
                (this.state.errors.length > 0) && 
                  this.state.errors.map(error => (
                    <p style={{color: "red"}}>{`Field ${error.field}: ${error.error}`}</p>
                  ))
                }
              </Grid>
            </Grid>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Signup;
