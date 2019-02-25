import React, { Component } from 'react'
import { NavLink } from 'react-router-dom';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import theme from '../Theme';

import '../styles/Header.scss';

export class Header extends Component {
  render() {
    return (
      <div>
        <MuiThemeProvider theme={theme}>
          <ul>
            <li>
                <NavLink to='/' >Home</NavLink>
            </li>
            <li>
                <NavLink to='/recipe'>Recipe</NavLink>
            </li>
          </ul>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Header;
