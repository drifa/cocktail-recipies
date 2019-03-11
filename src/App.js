import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';

import './App.scss';

import { Navigation } from './components/navigation/Navigation';
import { FrontPage } from './components/frontpage/FrontPage';
import { Recipe } from './components/recipe/Recipe';

class App extends Component {
  render() {
    return (
      <main className="App">
        <header className='app_header'>
          <Navigation />
        </header>
        <div className='parallax'>
          <div className='parallax-container'>
            <Switch>
              <Route exact path="/" component={FrontPage} />
              <Route path="/cocktails/:id" component={Recipe} />
            </Switch>
          </div>
        </div>
      </main>
    );
  }
}

export default App;
