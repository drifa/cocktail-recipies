import React, { Component } from 'react';
import Header from './components/Header';
import Recipe from './components/Recipe';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './App.scss';
import FrontPage from './components/FrontPage';

class App extends Component {
  state = {
    value: 0,
    recipe: [
      {
        id: 1,
        title: 'Moscow Mule',
        about: 'Something about the drink',
        img: 'images/teaDrink.jpg',
        ingredients: [
          {
            id: 1,
            ingredient: 'Vodka',
            quantity: '2 oz.',
          },
          {
            id: 2,
            ingredient: 'Lime juice',
            quantity: '1/2 oz.',
          },
          {
            id: 3,
            ingredient: 'Ginger beer',
            quantity: '5 oz.',
          },
          {
            id: 4,
            ingredient: 'Lime wedge for garnish',
            quantity: '1 wedge',
          }
        ],
        instruction: [
          {
            number: '1.',
            text: 'Pour vodka and squeeze lime juice into your glass/mug',
          },
          {
            number: '2.',
            text: 'Add ice cubes and then fill your glass/mug with ginger beer',
          },
          {
            number: '3.',
            text: 'Garnish with a lime wedge, and enjoy!',
          },
        ],
        equipments: [
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
      <Router>
        <div className="App">
          <Header />
          <div className='parallax'>
            <div className='parallax-container'>
              <Switch>
                <Route exact path="/" component={FrontPage} />
                <Route  path="/recipe" render={()=> <Recipe recipe={this.state.recipe} />} />
              </Switch>
            </div>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
