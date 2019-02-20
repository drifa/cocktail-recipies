import React, { Component } from 'react';
import RecipeDesc from './RecipeDescription';
import propTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import '../styles/Recipe.scss';

class AboutDrink extends Component {
  render() {
    const recipe = this.props.recipeInfo

    return (
      <Paper className='about-drink-container'>
        <Typography variant='h4' component='h3' id='recipe-title'>
          {recipe.title}
        </Typography>
        <Fab color="primary" size='small' aria-label="Add" className='save-recipe'>
          <AddIcon />
        </Fab>
        <Typography component='p' id='about-drink-text'>
          {recipe.about}
        </Typography>
      </Paper>
    );
  }
}

export class Recipe extends Component {
  render() {
    return this.props.recipe.map((recipeInfo) => (
      <div className='Recipe'>
        <div className='about-drink'>
          <Grid container spacing={24} className='about-drink-grid'>
            <Grid item xs={12}>
              <AboutDrink key={recipeInfo.id} recipeInfo = {recipeInfo} />
            </Grid>
            <Grid item xs={12}>
              <RecipeDesc key={recipeInfo.id} recipeInfo = {recipeInfo}/>
            </Grid>
          </Grid>
        </div>
      </div>
    )); 
  }
}

// PropTypes
Recipe.propTypes = {
  recipe: propTypes.array.isRequired
}

export default Recipe;
