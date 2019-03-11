import React, { Component } from 'react';
import { RecipeDescription } from '../recipeDescription/RecipeDescription';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './Recipe.scss';

const { fetchAllData } = require('../frontpage/FrontPage');

async function fetchCocktail(id) {
  const cocktails = await fetchAllData();
  const cocktailsFiltered = cocktails.filter(cocktail => (cocktail.id === id));

  if (cocktailsFiltered.length > 0) {
    return cocktailsFiltered[0];
  }
}

export class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loading: true,
        cocktail: {},
        error: false,
    }
  }

  async componentDidMount() {
    try {
      const cocktail = await fetchCocktail(Number.parseInt(this.props.match.params.id));
      this.setState({ loading: false, cocktail, error: false});
    } catch (error) {
      console.error('Error fetching stats', error);
      this.setState({ error: true, loading: false });
    }
  }
  
  
  render() {

    const { cocktail, loading } = this.state;

    if (loading ) {
      return (<div>Hleð inn gögnum...</div>);
    }

    return (
      <div className='Recipe'>
        <div className='about-drink'>
          <Grid container spacing={24} className='about-drink-grid'>
            <Grid item xs={12}>
            <Paper className='about-drink-container'>
              <Typography variant='h4' component='h3' id='recipe-title'>
                {cocktail.title}
              </Typography>
              <Fab color="primary" size='small' aria-label="Add" className='save-recipe'>
                <AddIcon />
              </Fab>
            </Paper>
            </Grid>
            <Grid item xs={12}>
              <RecipeDescription cocktailInfo={cocktail}/>
            </Grid>
          </Grid>
        </div>
      </div>
    ); 
  }
}
