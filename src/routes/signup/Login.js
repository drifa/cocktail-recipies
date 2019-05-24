import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Paper, Button, TextField, Grid, Typography } from '@material-ui/core';
import theme from '../../Theme';

import './register.scss';

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
                  Please Login
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

              <Grid item>
                <Button type='submit' variant="contained" color="secondary" onClick={this.handleSubmit}>Login</Button>
                {
                this.state.errorMessage &&
                (<p style={{color: "red"}}>{this.state.errorMessage}</p>)
                }
              </Grid>
            </Grid>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Login;
