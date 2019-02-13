import React, { Component } from 'react';
import RecipeDesc from './RecipeDescription';
import propTypes from 'prop-types';
import './Recipe.css';

class Recipe extends Component {
  render() {
    return this.props.recipe.map((recipeInfo) => (
      <div className='Recipe'>
        <h3>{recipeInfo.title}</h3>
        <RecipeDesc key={recipeInfo.id} recipeInfo = {recipeInfo}/>
      </div>
    ));
  }
}

// PropTypes
Recipe.propTypes = {
  recipe: propTypes.array.isRequired
}

export default Recipe;
