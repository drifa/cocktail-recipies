import React, { Component } from 'react';
import { RecipeDescription } from '../../components/recipeDescription/RecipeDescription';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import theme from '../../Theme';
import './Recipe.scss';

var url = 'https://cocktails-backend.herokuapp.com/cocktails';

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
    console.log('Props: ', this.props)
    const { id } = this.props.computedMatch.params;
    const response = await fetch(`${url}/${id}`);
    const data = await response.json();
    return data;
  }
  
  render() {

    const { cocktail, loading } = this.state;

    if (loading ) {
      return (<div>Hleð inn gögnum...</div>);
    }

    const style = {
      backgroundImage: "url("+cocktail.imageurl+")",
    }

    console.log('Image: ', cocktail);

    return (
      <div className='Recipe'>
        <MuiThemeProvider theme={theme}>
          <section className='about-drink'>
            <Grid container spacing={24} className='about-drink-grid'  justify='center' alignItems='center'>
              <Grid item xs={12}>
                <Grid container spacing={24} direction='row' justify='center' alignItems='center'>
                  <Grid item xs={7}>
                    <Paper className='about-drink-container' >
                      <Typography variant='h4' id='recipe-title'>
                        {cocktail.title}
                      </Typography>
                      <Typography variant='subtitle2' className='recipe-about-text'>
                        {cocktail.about_cocktail}
                      </Typography>
                      <Typography variant='subtitle1' className='recipe-about'>
                        Cocktail type: {cocktail.cocktail_type}
                      </Typography>
                      <Typography variant='subtitle1' className='recipe-about'>
                        Cocktail difficulty: {cocktail.difficulty}
                      </Typography>
                    </Paper>
                  </Grid>
                  <Grid item xs={5}>
                  <Paper className='about-drink-container' style={style} />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <RecipeDescription cocktailInfo={cocktail}/>
              </Grid>
            </Grid>
          </section>
        </MuiThemeProvider>
      </div>
    ); 
  }
}

export default Recipe;
