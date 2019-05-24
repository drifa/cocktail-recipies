import React, { Component } from 'react';
import axios from 'axios';
import AddIcon from '@material-ui/icons/Add';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Grid, Card, CardActionArea, CardMedia, Typography, CardContent, Fab, Avatar } from '@material-ui/core';
import theme from '../../Theme';

import './UsersProfile.scss';

const url = 'https://cocktails-backend.herokuapp.com/users';

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

    const titleLoggedInUsersCocktails = ( <Typography variant='h5'>Your Cocktail Recipes:</Typography>);
    
    const titleUsersCocktails = (<Typography variant='h5'>{data.user.username}'s Cocktail Recipes:</Typography>);

    const createCocktailButton = (
      <Grid item xs={4} className='card-cocktail-grid-item'>
          <Card className='card-cocktail'>
            <Fab id='addIcon-button' color="secondary" aria-label="Add" href='/createCocktail'>
              <AddIcon />
            </Fab>
              <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                  Create Cocktail
                </Typography>
              </CardContent>
          </Card>
      </Grid>
    );
    
    const LoggedInCreateButton = [];
    const outcomeTitle = [];
    
    if (this.props.computedMatch.params.id === 'me') {
      outcomeTitle.push(titleLoggedInUsersCocktails);
      LoggedInCreateButton.push(createCocktailButton);
    } else {
      outcomeTitle.push(titleUsersCocktails);
    }

    return (
      <div className='main-div-user-profile'>
        <MuiThemeProvider theme={theme}>
          <Grid 
            id='grid-container'
            container
            direction='row'
            justify='center'
            alignItems="flex-stretch"
          >
            <Grid item xs={4} className='user-profile-grid-item-1' >
            <Grid 
              container
              spacing={24}
              direction='column'
              justify='center'
              alignItems="center"
            >
              <Grid item>
                <Avatar id='profile-image' alt="Remy Sharp" src="/images/avatar.jpg" />
              </Grid>
              <Grid item>
                <Typography variant='h4'>{data.isLoading && 'Loading...'}</Typography>
                <Typography variant='h3'>{(!data.isLoading && !data.error) && data.user.username}</Typography>
              </Grid>
              <Grid item>
                <Typography variant='h6'>{data.user.email}</Typography>
              </Grid>
            </Grid>
              
            </Grid>
            <Grid item xs={8} id='cocktail-card-grid' className='user-profile-grid-item-1'>
              <div id='users-cocktail-recipes-title'>
                <Typography variant='h5'>{outcomeTitle}</Typography>
              </div>

              <Grid 
                id='users-cocktails'
                container
                spacing={40}
                direction='row'
                justify="flex-start"
                alignItems="flex-start"
              >
                {LoggedInCreateButton}

                {(!this.state.isLoading && !this.state.error) && data.user.cocktails.map(cocktail => (
                <Grid item xs={4} className='card-cocktail-grid-item'>
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
            </Grid>
          </Grid>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default UsersProfile
