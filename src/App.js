import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthContainer from './containers/Auth'
import {BrowserRouter,Switch} from 'react-router-dom'
class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <Switch>
            <AuthContainer/>
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
