import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.scss';
import { Header } from './components/Header';
import { LeftMenu } from './components/LeftMenu';

import { ReadingAnime } from './actions';
import { fetchCardPopAnime } from './redux/slices';
import { useAppDispatch, useAppSelector } from './redux/hooks';
import { AnimeCard } from './components/AnimeCard';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import { PageHome } from './routes/PageHome';
import { PageSing } from './routes/PageSing';
import { PageTop } from './routes/PageTop';
import { PageNew } from './routes/PageNew';
import { PageOngoing } from './routes/PageOngoing';
import { PageEpisodes } from './routes/PageEpisodes';
import { PageGenres } from './routes/PageGenres';
import { PageAnimeRefreshRender } from './routes/PageAnimeRefreshRender';
import { PageYears } from './routes/PageYears';
import { PageAccount } from './routes/PageAccount';
import { Footer } from './components/Footer';

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    ReadingAnime(1, 15, 'type=tv&score=8&start_date=2017').then(anime => {
      if (anime)
        dispatch(fetchCardPopAnime(anime))
    });
  }, []);

  function PageGenre() {
    const gen = useParams();
    return <PageAnimeRefreshRender tittle={`${gen.name} Anime`} url={`genres=${gen.id}&order_by=start_date&sort=desc`} />;
  }

  function PageYear() {
    const year = useParams();
    return <PageAnimeRefreshRender tittle={`Anime ${year.year} Year`} url={`start_date=${year.year}&order_by=start_date&sort=asc`} />;
  }

  function PageSearch() {
    const search = useParams();
    return <PageAnimeRefreshRender tittle={`Search By Request '${search.search}'`} url={`q=${search.search}`} />;
  }

  function PageAnime() {
    const idAnime = useParams();
    return <PageAnimeRefreshRender animeID={Number(idAnime.id)} />
  }

  return (
    <div className="App">

      <BrowserRouter>
        <Header />
        <LeftMenu />
        <div className='App-main-child'>
          <Routes>
            <Route path='/' element={<PageHome />}></Route>
            <Route path='/sing' element={<PageSing />}></Route>
            <Route path='/top' element={<PageTop />}></Route>
            <Route path='/new' element={<PageNew />}></Route>
            <Route path='/ongoing' element={<PageOngoing />}></Route>
            <Route path='/episodes' element={<PageEpisodes />}></Route>
            <Route path='/genres/*' element={<PageGenres />}></Route>
            <Route path='/genres/:name/:id' element={<PageGenre />} ></Route>
            <Route path='/years/*' element={<PageYears />}></Route>
            <Route path='/years/:year' element={<PageYear />} ></Route>
            <Route path='/search/:search' element={<PageSearch />}></Route>
            <Route path='/anime/:id' element={<PageAnime />}></Route>
            <Route path='/account' element={<PageAccount />}></Route>
            <Route path='*'
              element={
                <main>
                  <p>404 not found</p>
                </main>
              }></Route>
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );

}

export default App;


