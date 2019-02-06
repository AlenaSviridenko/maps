import React, { Component } from 'react';

import MainScreen from './components/MainScreen';

import './App.scss';

class App extends Component {
  render() {
    return (
        <div className="app">
          <MainScreen/>
        </div>
    );
  }
}

export default App;
