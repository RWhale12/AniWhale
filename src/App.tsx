import React from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { LeftMenu } from './components/LeftMenu';
import { PanelSing } from './components/PanelSing';

function App() {
  return (
    <div className="App">
      <Header />
      <LeftMenu />
      <div className='App-children'>
        <PanelSing />
      </div>
    </div>
  );
}

export default App;
