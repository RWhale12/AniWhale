import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { Header } from './components/Header';
import { LeftMenu } from './components/LeftMenu';
import { PanelSing } from './components/PanelSing';
import { ReadingAnime } from './actions';
import { useDispatch, useSelector } from 'react-redux';
import { InputType } from 'zlib';
import { fetchCardPopAnime } from './redux/slices';
import { createModuleResolutionCache } from 'typescript';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AnimeCard } from './components/AnimeCard';
import { WritingAnime } from './components/WritingAnime';
import { AfishaPopular } from './components/AfishaPopular';
import { PageHome } from './routes/PageHome';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ReadingAnime(1, 15, 'type=tv&score=8&start_date=2017').then(anime => {
      if (anime)
        dispatch(fetchCardPopAnime(anime))
      console.log(anime)
    });
  }, []);

  return (
    <div className="App">

      <Header />
      <LeftMenu />
          <PanelSing />
    </div>
  );

}

export default App;


