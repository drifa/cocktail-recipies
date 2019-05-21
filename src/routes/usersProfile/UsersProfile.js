import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent } from '@material-ui/core';
import theme from '../../Theme';

import './UsersProfile.scss';

const url = 'http://localhost:5000/users';

export class UsersProfile extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      user: {},
      error: '',
    };
  }

  componentDidMount() {
    axios.get(`${url}/${this.props.computedMatch.params.id}`, { headers: { Authorization: `Bearer ${this.props.context.token}` }})
      .then(response => {
        this.setState(state => {
          return {
            ...state,
            isLoading: false,
            user: response.data,
          }
        });
      })
      .catch(error => {
        this.setState(state => ({
          ...state,
          isLoading: false,
          error: error.message,
        }));
      })
  }

  render() {
    const data = this.state;

    return (
      <div id='main-div'>
        <MuiThemeProvider theme={theme}>
          <Grid container >
            <Grid item xs={4}>
              <section id='users-info' color='primary'>
                <p>{data.isLoading && 'Loading...'}</p>
                <h1>{(!data.isLoading && !data.error) && data.user.username}</h1>
              </section>
            </Grid>
            <Grid item xs={8}>
              <Grid 
                id='users-cocktails'
                container
                direction='column'
                justify="center"
                alignItems="center">
                <Grid item xs={12}>
                  <section id='users-cocktails-section' color='primary'>
                    <Grid container spacing={24}>
                      {(!this.state.isLoading && !this.state.error) && data.user.cocktails.map(cocktail => (
                        <Grid item xs={4}
                          direction="row"
                          justify="center"
                          alignItems="center"
                        >
                          <Card className='card-cocktail'>
                            <CardActionArea href={`/${cocktail.id}/`} cocktail={cocktail} >
                              <CardMedia
                                className='card-image-cocktail'
                                image={cocktail.imageurl}
                              />
                              <CardContent>
                              <Typography gutterBottom variant="h5" component="h2">
                                  {cocktail.title}
                                </Typography>
                              </CardContent>
                            </CardActionArea>
                          </Card>
                          </Grid>
                      ))}
                    </Grid>
                  </section>
                </Grid>
                <Grid item xs={12}>
                  <section id='users-favorite-cocktails-section' color='primary'>
                    <p>TODO: about the user (photo, email, username ect), list of created cocktails, list of favorite cocktails </p>
                    <Link to='/createCocktail'>Create new Cocktail</Link>
                  </section>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default UsersProfile
