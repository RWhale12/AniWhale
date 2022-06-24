import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { LeftMenu } from './components/LeftMenu';
import { PanelSing } from './components/PanelSing';
import { ReadingAnime } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { InputType } from 'zlib';
import { fetchCard } from './redux/slices';
import { createModuleResolutionCache } from 'typescript';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AnimeCard } from './components/AnimeCard';
import { WritingAnime } from './components/WritingAnime';

function App() {

  return (
    <div className="App">
      <Header />
      <LeftMenu />
      <div className='App-children'>
        <PanelSing />
        <WritingAnime />
      </div>
    </div>
  );

}

export default App;
