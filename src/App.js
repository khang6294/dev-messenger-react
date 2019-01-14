import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import AuthContainer from './containers/Auth'
class App extends Component {
  render() {
    return (
      <div>
        <AuthContainer/>
      </div>
    );
  }
}

export default App;
