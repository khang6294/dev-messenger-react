import React, { Component } from 'react';
import './App.css';
import AuthContainer from './containers/Auth'
import {BrowserRouter,Switch,Route} from 'react-router-dom'
import ChatAppContainer from '../src/containers/ChatApp'
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={ChatAppContainer}/>
            <AuthContainer/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
