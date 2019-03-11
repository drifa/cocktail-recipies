import React, { Component } from 'react'
import propTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import { Card, CardActions, CardContent, CardHeader, Typography } from '@material-ui/core';

import './RecipeDescription.scss';

class CardIngredients extends Component {
  render() {
    return (
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
							{ingredientInfo.ingredient}
						</Typography>
					</CardActions>
						
				</CardActions>
				)}
			</Card>
    );
  }
}

class CardInstructions extends Component {
  render() {
		return (
			<Card className='instructions-container'>
				<CardHeader title='Instructions' />
				{this.props.instruction.map((instructionInfo) => 
				<CardContent className='instruction-cocktail' key={instructionInfo.id}>

					<CardActions className='instruction-number'>
						<Typography>
							{instructionInfo.number}
						</Typography>
					<CardActions>
					
					</CardActions>
						<Typography>
							{instructionInfo.text}
						</Typography>
					</CardActions>

				</CardContent>
				)}
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
								{equipment.quantity}
							</Typography>

							<Typography>
								{equipment.type}
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
		instruction: this.props.cocktailInfo.instruction,
		equipments: this.props.cocktailInfo.equipments,
	}

  render() {
    return (
      <Grid container spacing={24} id='cocktail-info-grid-container'>

        <Grid container item spacing={24} xs id='ingredients-equipment-grid'>
          <Grid item id='ingredients-grid' xs={12}>
            <CardIngredients ingredients={this.state.ingredients}/>
          </Grid>
          <Grid item xs={12}>
            <CardEquipment equipments={this.state.equipments}/>
          </Grid>
        </Grid>

        <Grid container item spacing={24} xs id='instruction-grid'>
          <Grid item xs={12}>
            <CardInstructions instruction={this.state.instruction}/>
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
