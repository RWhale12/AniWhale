import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { ReadingAnime } from './actions/readingApi';
import { useDispatch, useSelector } from 'react-redux';
import { InputType } from 'zlib';
import { fetchCard } from './redux/slices';
import { createModuleResolutionCache } from 'typescript';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AnimeCard } from './components/AnimeCard';

function App() {
  const selector = useAppSelector(state => state.cardSliceReduser.content)
  const dispatch = useAppDispatch();

  function toggle() {
    const page = (document.querySelector('.input-page') as HTMLInputElement).value;
    const infoPage = ReadingAnime(Number(page))
      .then(anime => {
        if (anime)
          dispatch(fetchCard(anime))
        console.log(anime)
      });
  }


  return (
    <div className="App">
      <input className='input-page'></input>
      <button onClick={() => toggle()}>GO</button>
      <div className='anime'>
        {selector && selector.map(el => {
          return <AnimeCard name={el.name} id={el.id} image={el.image} rating={el.rating}/>
        })}
      </div>
    </div>
  );

}

export default App;
