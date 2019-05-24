import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Grid, TextField, MenuItem, Select, Button, Card, CardContent, CardActions, CardHeader, FormControl, FormControlLabel, FormGroup, InputLabel, Checkbox, Typography, OutlinedInput } from '@material-ui/core';
import theme from '../../Theme';

import './createCocktail.scss';

const url = 'https://cocktails-backend.herokuapp.com/cocktails';
const urlIngredients = 'https://cocktails-backend.herokuapp.com/ingredients';
const urlEquipments = 'https://cocktails-backend.herokuapp.com/equipments';

export class CreateCocktail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      instructions: '',
      about_cocktail: '',
      file: null,
      type: '',
      difficulty: '',
      author: null,
      ingredients: [],
      equipments: [],
      ingredientOptions: [],
      equipmentOptions: [],
      errors : [],
      redirect: false,
    }

    this.handleIngredientChecked = this.handleIngredientChecked.bind(this);
    this.handleEquipmentChecked = this.handleEquipmentChecked.bind(this);
    this.handleFileChanged = this.handleFileChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.catchError = this.catchError.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    axios.get(urlIngredients).then(response => {
      const ingredientOptions = response.data.items.map(ingredient => ({
        ...ingredient,
        quantity: '',
      }));
      this.setState(state => {
        return {
          ...state,
          ingredientOptions,
        };
      })
      return response;
    }); 

    axios.get(urlEquipments).then(response => {
      console.log(response);
      const equipmentOptions = response.data.items.map(equipment => ({
        ...equipment,
      }));
      this.setState(state => {
        return {
          ...state,
          equipmentOptions,
        };
      })
      return response;
    });
  }

  catchError(err) {
    this.setState(state => {
      return {
        ...state,
        errors: err.response.data.errors,
      }
    })
  }

  handleFileChanged = (e) => {
    const file = e.target.files[0];
    this.setState(state => {
      return {
        ...state,
        file,
      };
    });
  }

  handleIngredientChecked = (e) => {

    const checked = e.target.checked;

    const value = e.target.value;

    const ingredients = [...this.state.ingredients];

    const findIngredient = (title) => {
      const filtered = this.state.ingredientOptions.filter(i => i.title === title);
      if (filtered.length > 0) {
        return filtered[0];
      }
    }

    if (checked) {
      const valueChecked = findIngredient(value);
      ingredients.push(valueChecked);
    } else {
      for(let i=0; i<ingredients.length; i++){
        if (ingredients[i].title === value) {
          ingredients.splice(i,1);
        }
      }
    }

    this.setState(state => {
      return {
        ...state,
        ingredients,
      };
    });
  }

  handleEquipmentChecked = (e) => {

    const checked = e.target.checked;

    const value = e.target.value;

    const equipments = [...this.state.equipments];

    const findIngredient = (title) => {
      const filtered = this.state.equipmentOptions.filter(i => i.title === title);
      if (filtered.length > 0) {
        return filtered[0];
      }
    }

    if (checked) {
      const valueChecked = findIngredient(value);
      equipments.push(valueChecked);
    } else {
      for(let i=0; i<equipments.length; i++){
        if (equipments[i].title === value) {
          equipments.splice(i,1);
        }
      }
    }

    this.setState(state => {
      return {
        ...state,
        equipments,
      };
    });
  }

  handleChange(e) {
    const name = e.target.name;
    const value = e.target.value;
    this.setState(state => {
      return {
        ...state,
        [name]: value
      };
    });
  };

  formSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('image', this.state.file);
    const config = {
      headers: {
        'content-type': 'multipart/form-data',
        'Authorization': `Bearer ${this.props.context.token}`,
      }
    }

    const jsonConfig = {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${this.props.context.token}`,
      }
    }

    axios.post(`${url}/upload`, formData, config)
      .then(response => {
        axios
          .post(url, {
            title: this.state.title,
            instructions: this.state.instructions,
            about_cocktail: this.state.about_cocktail,
            ingredients: this.state.ingredients,
            equipments: this.state.equipments,
            image: response.data.url,
            type: this.state.type,
            author: response.data.user.id,
            difficulty: this.state.difficulty,
          }, jsonConfig)
          .then((res) => {
            this.setState(state => ({
              ...state,
              redirect: true,
            }));
          })
          .catch(this.catchError)
      })
      .catch(this.catchError)
  }

  render() {
    if (this.state.redirect) {
      return (<Redirect to="/user/me" />);
    }

    console.log(this.state.equipmentOptions)
    return (
      <div className='main-div-createCocktail'>
        <MuiThemeProvider theme={theme}>
        <div className='createCocktail'>
          <Typography variant='h3' color='secondary'>Create new Cocktail</Typography>
        </div>
        <form onSubmit={this.formSubmit}>
          <Grid container spacing={24} direction='column' justify='center' alignItems='center'>
            <Grid item xs={12}>
                <Card className='card-createCocktail'>
                  <CardContent className='cardContent-createCocktail'>
                    <Grid container spacing={24} direction='row' justify='flex-start' alignItems='center'>
                      <Grid item xs={12} sm={6} >
                        <Grid container spacing={24} direction='column' justify='flex-start' alignItems='flex-start'>
                          <Grid item xs={12}>
                            <TextField
                              id="title-createCocktail"
                              name='title'
                              label="Title"
                              margin="dense"
                              onChange={this.handleChange}
                              value={this.state.title}
                              variant="outlined"
                              color='secondary'
                            />
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl variant='outlined' className='formControl'>
                              <InputLabel>Type</InputLabel>
                              <Select
                                value={this.state.type}
                                name="type"
                                input={<OutlinedInput name="type" id="cocktail-type-picker" />}
                                onChange={this.handleChange}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value='Sweet'>Sweet</MenuItem>
                                <MenuItem value='Sour'>Sour</MenuItem>
                                <MenuItem value='Hot'>Hot</MenuItem>
                                <MenuItem value='Strong'>Strong</MenuItem>
                                <MenuItem value='Light'>Light</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <FormControl variant='outlined' className='formControl'>
                            <InputLabel>Difficulty</InputLabel>
                              <Select
                                value={this.state.difficulty}
                                name="difficulty"
                                input={<OutlinedInput name="difficulty" id="cocktail-difficulty-picker" />}
                                onChange={this.handleChange}
                              >
                                <MenuItem value="">
                                  <em>None</em>
                                </MenuItem>
                                <MenuItem value='Easy'>Easy</MenuItem>
                                <MenuItem value='Normal'>Normal</MenuItem>
                                <MenuItem value='Hard'>Hard</MenuItem>
                                <MenuItem value='Very hard'>Very hard</MenuItem>
                              </Select>
                            </FormControl>
                          </Grid>

                          <Grid item xs={12}>
                            <CardActions>
                              <Typography variant='subtitle1'>Upload Image</Typography>
                              <input type="file" onChange={this.handleFileChanged} />
                            </CardActions>
                          </Grid>
                        </Grid>
                      </Grid>

                      <Grid item xs={12} sm={6}>
                        <TextField
                          id="outlined-multiline-static"
                          name='about_cocktail'
                          className='textField-createCocktail'
                          value={this.state.about_cocktail}
                          onChange={this.handleChange}
                          multiline
                          rows="9"
                          placeholder="Write something about your cocktail here"
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>

                <Card className='card-createCocktail'>
                  <CardHeader title='Ingredients'/>
                  <CardContent className='cardContent-createCocktail'>
                    <CardActions>
                      <FormGroup row>
                        <Grid container spacing={24} direction='row' justify='flex-start'>
                        {this.state.ingredientOptions
                          .map(ingredient => (
                            <Grid item xs={12} sm={3}>
                              <FormControlLabel onChange={this.handleIngredientChecked} control={<Checkbox value={ingredient.title} />} label={ingredient.title} />
                            </Grid>
                          ))}
                        </Grid>
                      </FormGroup>
                    </CardActions>
                  </CardContent>
                </Card>

                <Card className='card-createCocktail'>
                  <CardHeader title='Equipments'/>
                  <CardContent className='cardContent-createCocktail'>
                    <FormGroup row>
                      <Grid container spacing={24} direction='row' justify='flex-start'>
                        {this.state.equipmentOptions
                          .map(equipment => (
                            <Grid item xs={12} sm={3}>
                              <FormControlLabel onChange={this.handleEquipmentChecked} control={<Checkbox value={equipment.title} />} label={equipment.title} />
                            </Grid>
                          ))}
                      </Grid>
                    </FormGroup>
                  </CardContent>
                </Card>

                <Card className='card-createCocktail'>
                  <CardHeader title='Instructions'/>
                  <CardContent className='cardContent-createCocktail'>
                    <Grid container spacing={24} direction='column' justify='center' alignItems='center'>
                      <Grid item xs={12} className='textField-createCocktail' >
                        <TextField
                          id="outlined-multiline-static"
                          className='textField-createCocktail'
                          name='instructions'
                          value={this.state.instructions}
                          onChange={this.handleChange}
                          multiline
                          rows="9"
                          placeholder="Write instructions here"
                          margin="normal"
                          variant="outlined"
                        />
                      </Grid>

                      <Grid item xs={12} >
                        <Button variant="contained" type='submit' color="secondary">
                          Create Cocktail
                        </Button>
                        {
                          (this.state.errors.length > 0) && 
                            this.state.errors.map(error => (
                              <p style={{color: "red"}}>{`Field ${error.field}: ${error.error}`}</p>
                            ))
                          }
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
            </Grid>
          </Grid>
        </form>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default CreateCocktail
