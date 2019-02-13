import React, { Component } from 'react'
import propTypes from 'prop-types';

export class RecipeDescription extends Component {
  render() {
      const { ingredients, instruction, equipment} = this.props.recipeInfo;
    return (
        <div>
            {ingredients.map((ingredientInfo) => 
            <div key={ingredientInfo.id}>
                <div>
                    <p>
                        {ingredientInfo.ingredient}
                    </p>
                </div>
                <div>
                    <p>
                        {ingredientInfo.quantity}
                    </p>
                </div>
            </div>
            )}

            {instruction.map((instructionInfo) => 
            <div key={instructionInfo.id}>
                <div>
                    <p>
                        {instructionInfo.number}
                    </p>
                </div>
                <div>
                    <p>
                        {instructionInfo.text}
                    </p>
                </div>
            </div>
            )}

            {equipment.map((equipments) => 
            <div key={equipments.id}>
                <div>
                    <p>
                        {equipments.type}
                    </p>
                </div>
                <div>
                    <p>
                        {equipments.quantity}
                    </p>
                </div>
            </div>
            )}
        </div>
    );
  }
}

// PropTypes
RecipeDescription.propTypes = {
    recipeInfo: propTypes.object.isRequired
  }

export default RecipeDescription
