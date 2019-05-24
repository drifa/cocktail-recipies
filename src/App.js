import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './contextAPI/ContextProvider';
import { AppContext } from './contextAPI/ContextProvider';

import './App.scss';

import { Navigation } from './routes/navigation/Navigation';
import { CreateCocktail } from './routes/createCocktail/CreateCocktail';
import { UsersProfile } from './routes/usersProfile/UsersProfile';
import { FrontPage } from './routes/frontPage/FrontPage';
import { Recipe } from './routes/recipe/Recipe';
import { Login } from './routes/signup/Login';
import { Signup } from './routes/signup/Signup';
import ProtectedRoute from "./contextAPI/ProtectedRoute";

class App extends Component {


  
  render() {
    return (
      <main className="App">
        <ContextProvider>
          <header className='app_header'>
          </header>
          <div className='parallax'>
          </div>
          <AppContext.Consumer>
            {(context) => (
              <div id='consumer-div'>
                <Navigation context={context} id='navigation-app'/>
                <AppContext.Consumer>
                  {(context) => (
                  <Switch>
                    <ProtectedRoute path="/createCocktail" component={CreateCocktail}/>
                    <ProtectedRoute path="/user/:id" component={UsersProfile}/>
                    <Route path="/login" render={(props) => (<Login {...props} context={context} />)}/>
                    <Route path="/signup" render={(props) => (<Signup {...props} context={context} />)} />
                    <ProtectedRoute path="/:id" component={Recipe} />
                    <ProtectedRoute path="/" component={FrontPage}/>
                  </Switch>
                  )}
                </AppContext.Consumer>
              </div>
            )}
          </AppContext.Consumer>
        </ContextProvider>
      </main>
    );
  }
}

export default App;
