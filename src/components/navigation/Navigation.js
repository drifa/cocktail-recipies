import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import MenuIcon from '@material-ui/icons/Menu';
import { AccountCircle } from '@material-ui/icons';
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
        { this.props.context.token ? (<div className='loggedin-div'>
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
      <div className='login-div'>
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
      <div className='navigation-main-div'>
        <MuiThemeProvider theme={theme}>
          <AppBar position='fixed' >
            <Toolbar id='navigation-toolbar' variant='regular'>
              <IconButton id='menuButton' color="inherit" aria-label="Menu">
                <MenuIcon />
              </IconButton>
              <div className='cocktail-recipes-home'>
                <Link id='cocktail-recipes-home-link' variant='h6' color='inherit' href='/'>Cocktail Recipes</Link>
              </div>
              <div id='login-div'>
                { listItems }
              </div>
            </Toolbar>
          </AppBar>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Navigation;