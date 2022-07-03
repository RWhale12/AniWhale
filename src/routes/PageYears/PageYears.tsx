import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReadingGenres } from '../../actions/readingApi';
import { IGenres } from '../../components/Filters/Filters';
import { Loader } from '../../components/Loader';
import { TittleBlock } from '../../components/TittleBlock';
import { useAppDispatch } from '../../redux/hooks';
import './PageYears.scss'

export const PageYears = () => {
    
    const arrayYears = []
    for(let i=2022; i>=1991; i--){
        arrayYears.push(i);
    }


    return (
        <div className='App-children'>
            <TittleBlock tittle={`Years Anime`}/>
            <div className='animes'>
                {!arrayYears && <Loader />}
                <div className='all-years'>
                    {arrayYears && arrayYears.map((year) => {
                        return <Link to={`/years/${year}`}><div className='all-years--year'>{year}</div></Link>
                    })}
                </div>
            </div>
        </div>
    )
}