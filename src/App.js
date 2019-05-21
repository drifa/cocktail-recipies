import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import ContextProvider from './contextAPI/ContextProvider';
import { AppContext } from './contextAPI/ContextProvider';

import './App.scss';

import { Navigation } from './components/navigation/Navigation';
import { CreateCocktail } from './routes/createCocktail/CreateCocktail';
import { UsersProfile } from './routes/usersProfile/UsersProfile';
import { FrontPage } from './routes/frontPage/FrontPage';
import { Recipe } from './components/recipe/Recipe';
import { Login } from './components/signup/Login';
import { Signup } from './components/signup/Signup';
import ProtectedRoute from "./contextAPI/ProtectedRoute";

class App extends Component {


  
  render() {
    return (
      <main className="App">
        <ContextProvider>
          <header className='app_header'>
          </header>
          <AppContext.Consumer>
            {(context) => (
              <div>
                <Navigation context={context}/>
                <div className='parallax'>
                  <div className='parallax-container'>
                    <AppContext.Consumer>
                      {(context) => (
                      <Switch>
                        <ProtectedRoute path="/createCocktail" component={CreateCocktail}/>
                        <ProtectedRoute path="/user/:id" component={UsersProfile}/>
                        <Route path="/login" render={(props) => (<Login {...props} context={context} />)}/>
                        <Route path="/signup" render={(props) => (<Signup {...props} context={context} />)} />
                        <Route path="/:id" component={Recipe} />
                        <ProtectedRoute path="/" component={FrontPage}/>
                      </Switch>
                      )}
                    </AppContext.Consumer>
                  </div>
                </div>
              </div>
            )}
          </AppContext.Consumer>
        </ContextProvider>
      </main>
    );
  }
}

export default App;
