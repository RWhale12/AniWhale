import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ReadingGenres } from '../../actions/readingApi';
import { IGenres } from '../../components/Filters/Filters';
import { Loader } from '../../components/Loader';
import { TittleBlock } from '../../components/TittleBlock';
import { useAppDispatch } from '../../redux/hooks';
import './PageGenres.scss'

export const PageGenres = () => {
    const [arrayGenres, setArrayGenres] = useState<Array<IGenres>>();

    useEffect(() => {
        setTimeout(function () {
            ReadingGenres().then((genres) => {
                if (genres) setArrayGenres(genres);
            });
        }, 500)
    }, [])


    return (
        <div className='App-children'>
            <TittleBlock tittle={`Genres Anime`}/>
            <div className='animes'>
                {!arrayGenres && <Loader />}
                <div className='all-genres'>
                    {arrayGenres && arrayGenres.map((genres) => {
                        return <Link to={`/genres/${genres.name}/${genres.id}`}><div className='all-genres--genre'>{genres.name}</div></Link>
                    })}
                </div>
            </div>
        </div>
    )
}