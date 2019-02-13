import React, { Component } from 'react';
import Recipe from './components/Recipe';

import './App.css';

class App extends Component {
  state = {
    recipe: [
      {
        id: 1,
        title: 'Moscow Mule',
        ingredients: [
          {
            ingredient: 'Vodka',
            quantity: '2 oz.',
          },
          {
            ingredient: 'Lime juice',
            quantity: '1/2 oz.',
          },
          {
            ingredient: 'Ginger beer',
            quantity: '5 oz.',
          },
          {
            ingredient: 'Lime wedge for garnish',
            quantity: '1 wedge',
          }
        ],
        instruction: [
          {
            number: 1,
            text: 'Pour vodka and squeeze lime juice into your glass/mug',
          },
          {
            number: 2,
            text: 'Add ice cubes and then fill your glass/mug with ginger beer',
          },
          {
            number: 3,
            text: 'Garnish with a lime wedge, and enjoy!',
          },
        ],
        equipment: [
          {
            type: 'Glass or mug',
            quantity: 1
          },
          {
            type: 'Ice',
            quantity: 1
          },
          {
            type: 'Jigger',
            quantity: 1
          },
          {
            type: 'Lime squeezer',
            quantity: 1
          },
          {
            type: 'Knife',
            quantity: 1
          },
          {
            type: 'Chopping board',
            quantity: 1
          }
        ]
      }
    ]
  }

  render() {
    console.log(this.state.recipe);
    return (
      <div className="App">
        <header className="App-header">
          <Recipe recipe = {this.state.recipe} />
        </header>
      </div>
    );
  }
}

export default App;
