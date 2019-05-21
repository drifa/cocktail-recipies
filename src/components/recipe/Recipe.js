import React, { Component } from 'react';
import { RecipeDescription } from '../recipeDescription/RecipeDescription';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import './Recipe.scss';

var url = 'http://localhost:5000/cocktails';

/*const { fetchData } = require('../frontpage/FrontPage');

async function fetchCocktail(id) {
  const cocktails = await fetchData();
  const cocktailsFiltered = cocktails.filter(cocktail => (cocktail.id === id));

  if (cocktailsFiltered.length > 0) {
    return cocktailsFiltered[0];
  }
}*/

export class Recipe extends Component {
  state = {
    loading: true,
    data: {},
    error: false,
  }

  async componentDidMount() {
    try {
      const cocktail = await this.fetchData();
      this.setState({ loading: false, cocktail, error: false});
    } catch (error) {
      console.error('Error fetching stats', error);
      this.setState({ error: true, loading: false });
    }
  }

  fetchData = async () => {
    const { id } = this.props.match.params;
    //console.log("MADE IT 1", id)
    const response = await fetch(`${url}/${id}`);
    console.log(response);
    const data = await response.json();
    return data;
  }
  
  render() {

    const { cocktail, loading } = this.state;
    console.log(this.state);

    if (loading ) {
      return (<div>Hleð inn gögnum...</div>);
    }

    const style = {
      backgroundImage: "url("+cocktail.imageurl+")",
    }

    console.log('Image: ', cocktail);

    return (
      <div className='Recipe'>
        <div className='about-drink'>
          <Grid container spacing={24} className='about-drink-grid'>
            <Grid item xs={12}>
            <Paper className='about-drink-container' style={style}>
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

export default Recipe;
