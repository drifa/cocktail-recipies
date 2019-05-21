import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Button, AppBar, Toolbar, Typography, Link, IconButton } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme from '../../Theme';

import './Navigation.scss';

export class Navigation extends Component {

  constructor(props) {
    super(props);
    this.state = {
      didLogout: false,
    }

    this.logoutClicked = this.logoutClicked.bind(this);
  }

  logoutClicked() {
    this.props.context.logout()
      .then(() => {
        this.setState(state => {
          return {
            ...state,
            didLogout: true,
          };
        });
      });
  }

  render() {
    const isSignupRoute = window.location.pathname === '/signup';
    const isLoginRoute = window.location.pathname === '/login';

    const loginLogoutLI = (
      <div>
        { this.props.context.token ? (<div>
                                      <IconButton
                                        href='/user/me'
                                        color="inherit"
                                      >
                                        <AccountCircle />
                                      </IconButton>
                                      <Button variant="outlined" color="inherit" onClick={this.logoutClicked}>Logout</Button>
                                      </div>)
                                   : (<Button variant="outlined" color="inherit" href='/login'>Login</Button>)}
      </div>
    )

    const signupLI = (
      <div>
        <Button variant="outlined" color="inherit" href='/signup'>Signup</Button>
      </div>
    )

    let listItems = [
      loginLogoutLI,
    ];

    if (!this.props.context.token) {
      listItems.push(signupLI);
    }

    if (isSignupRoute) {
      listItems = [
        loginLogoutLI
      ]
    } else if (isLoginRoute) {
      listItems = [
        signupLI
      ];
    }

    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <CssBaseline />
          <AppBar position='fixed' >
            <Toolbar>
              <Link variant='h6' color='inherit' href='/'>Cocktail Recipes</Link>
              { listItems }
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Navigation;