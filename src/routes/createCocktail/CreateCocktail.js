import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';
import { Grid, TextField, MenuItem, Select, Button, Card, CardContent, CardActions, CardHeader, FormControl, FormControlLabel, FormGroup, InputLabel, Input, Checkbox, Typography } from '@material-ui/core';

import './createCocktail.scss';
import { debug } from 'util';

const url = 'http://localhost:5000/cocktails';
const urlIngredients = 'http://localhost:5000/ingredients';

export class CreateCocktail extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      instructions: '',
      file: null,
      type: '',
      difficulty: '',
      ingredients: [],
      ingredientOptions: [],
      errors : [],
      redirect: false,
    }

    this.handleIngredientChecked = this.handleIngredientChecked.bind(this);
    this.handleFileChanged = this.handleFileChanged.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.catchError = this.catchError.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  componentDidMount() {
    console.log('Context: ',this.props.context);

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
    }); // ingredients

    // axios.get() fyrir equipment
  }

  catchError(err) {
    const message = err.message;
    this.setState(state => {
      return {
        ...state,
        error: message,
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
    console.log('CHECKED: ',e.target.checked);
    console.log('Value: ',e.target.value);

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
    console.log('Ingredients checked', ingredients);
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
            ingredients: this.state.ingredients,
            image: response.data.url,
            type: this.state.type,
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
    return (
      <div>
        <div className='createCocktail'>
          <h1>Create new Cocktail</h1>
        </div>
        <form onSubmit={this.formSubmit}>
          <Grid container spacing={16}>
            <Grid item xs={12}>
              <Grid item>
                <Card>
                  <CardContent>
                    <CardActions>
                      <TextField
                        id="title-createCocktail"
                        name='title'
                        label="Title"
                        margin="dense"
                        onChange={this.handleChange}
                        value={this.state.title}
                        variant="outlined"
                      />
                    </CardActions>

                    <CardActions>
                      <FormControl className='formControl'>
                        <InputLabel>Type</InputLabel>
                        <Select
                          value={this.state.type}
                          name="type"
                          input={<Input name="type" id="cocktail-type-picker" />}
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
                    </CardActions>

                    <CardActions>
                    <FormControl className='formControl'>
                      <InputLabel>Difficulty</InputLabel>
                        <Select
                          value={this.state.difficulty}
                          name="difficulty"
                          input={<Input name="difficulty" id="cocktail-difficulty-picker" />}
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
                    </CardActions>

                    <CardActions>
                      <Typography variant='h6'>Upload Image</Typography>
                      <input type="file" onChange={this.handleFileChanged} />
                    </CardActions>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader title='Ingredients'/>
                  <CardContent>
                    <CardActions>
                      <FormGroup row>
                        {this.state.ingredientOptions
                          .map(ingredient => (
                            <FormControlLabel onChange={this.handleIngredientChecked} control={<Checkbox value={ingredient.title} />} label={ingredient.title} />
                          ))}
                      </FormGroup>
                    </CardActions>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader title='Instructions'/>
                  <CardContent>
                    <CardActions>
                      <TextField
                        id="outlined-multiline-static"
                        name='instructions'
                        value={this.state.instructions}
                        onChange={this.handleChange}
                        multiline
                        rows="9"
                        placeholder="Write instructions here"
                        margin="normal"
                        variant="outlined"
                      />
                    </CardActions>
                  </CardContent>
                </Card>

                <Button variant="contained" type='submit' color="primary">
                  Create Cocktail
                </Button>

              </Grid>
            </Grid>
          </Grid>
        </form>
      </div>
    )
  }
}

export default CreateCocktail
