import React, { Component } from 'react'
import propTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { Card, CardActions, CardContent, CardHeader, Typography, Table, TableBody, TableRow, TableCell} from '@material-ui/core';
import theme from '../../Theme';

import './RecipeDescription.scss';

class CardIngredients extends Component {
  render() {
    return (
			<MuiThemeProvider theme={theme}>
			<Card className='ingredients-container'>
				<CardHeader title='Ingredients'/>
				{this.props.ingredients.map((ingredientInfo) => 
				<CardActions className='ingredients-cocktail' key={ingredientInfo.id}>
					<CardActions className='ingredient-info'>
						<Checkbox className='ingredients-info' value="checkedC" />

						<Typography className='ingredients-info'>
							{ingredientInfo.quantity}
						</Typography>

						<Typography className='ingredients-info'>
							{ingredientInfo.title}
						</Typography>
					</CardActions>
						
				</CardActions>
				)}
			</Card>
			</MuiThemeProvider>
    );
  }
}

class CardInstructions extends Component {
  render() {
		const instructions = this.props.instructions.split('\n');
		console.log('instructions: ', instructions);

		let newText = instructions.map((item, i) => {
			return (
				<TableRow key={i}>
					<TableCell style={{borderBottom : 'none'}}>{i + 1}.</TableCell>
					<TableCell style={{borderBottom : 'none'}}>{item}</TableCell>
				</TableRow>
			)
		});

		return (
			<Card className='instructions-container'>
				<CardHeader title='Instructions' />
				<CardContent className='instruction-cocktail'>

					<CardActions className='instruction-number'>
					<Table>
						<TableBody>
							{newText}
						</TableBody>
					</Table>
					</CardActions>

				</CardContent>
			</Card>
		);
  }
}

class CardEquipment extends Component {
  render() {
    return (
      <Card className='equipment-container'>
        <CardHeader title='Equipment' />
				{this.props.equipments.map((equipment) => 
					<CardActions className='equipment-cocktail' key={equipment.id}>

						<CardActions className='equipment-info'>
							<Checkbox value="checkedC" />

							<Typography>
								{equipment.title}
							</Typography>
						</CardActions>

					</CardActions>
				)}
      </Card>
    );
  }
}

export class RecipeDescription extends Component {
	state = {
		ingredients: this.props.cocktailInfo.ingredients,
		instructions: this.props.cocktailInfo.instructions,
		equipments: this.props.cocktailInfo.equipments,
	}

  render() {

    return (
      <Grid container spacing={24} id='cocktail-info-grid-container' >

        <Grid item xs={12} sm={6} id='ingredients-grid'>
					<Grid spacing={24} direction='row'>
						<CardIngredients ingredients={this.state.ingredients}/>
					</Grid>
        </Grid>

				<Grid item xs={12} sm={6} >
					<Grid container direction='column' spacing={24}> 
						<Grid item xs={12} id='instruction-grid'>
							<CardInstructions instructions={this.state.instructions}/>
						</Grid>

						<Grid item xs={12} id='equipment-grid'>
							<CardEquipment equipments={this.state.equipments}/>
						</Grid>
					</Grid>
				</Grid>
      </Grid>
    );
  }
}

// PropTypes
RecipeDescription.propTypes = {
    cocktailInfo: propTypes.object.isRequired
}

export default RecipeDescription;