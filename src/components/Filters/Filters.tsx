import { type } from '@testing-library/user-event/dist/type';
import { useEffect, useState } from 'react';
import { ReadingGenres } from '../../actions/readingApi';
import './Filters.scss'

type FilterProps = {
    updateData: (url: string) => void;
}

export type IGenres = {
    name: string;
    id: number;
}

export const Filters = (props: FilterProps) => {
    const url = 'hello';
    const arrayYear = [2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022];
    const [arrayGenres, setArrayGenres] = useState<Array<IGenres>>();

    useEffect(() => {
        setTimeout(function(){
            ReadingGenres().then((genres) => {
                if(genres) setArrayGenres(genres);
            });
        }, 500)
    }, [])

    function WritingFilterAnime() {
        let urlYear = '', urlGenres = '';
        const year = (document.querySelector('.filters-dropdown-year') as HTMLSelectElement).value;
        const genres = (document.querySelector('.filters-dropdown-genres') as HTMLSelectElement).value;

        if(year != '')
        urlYear = `&start_date=${year}`;
        if(genres != '')
        urlGenres = `&genres=${genres}`
        
        const url = urlYear + urlGenres;
        props.updateData(url);
    }

    return (
        <div className='filters'>
            <select name="" className='filters-dropdown filters-dropdown-year'>
                <option value="">Year</option>
                {arrayYear.map((year, index) => {
                    return <option value={year}>{year}</option>
                })}
            </select>
            <select name="" className='filters-dropdown filters-dropdown-genres'>
                <option value="">Genres</option>
                {arrayGenres && arrayGenres.map((genres, index) => {
                    return <option value={genres.id}>{genres.name}</option>
                })}
            </select>
            <button onClick={() => { WritingFilterAnime() }} className='filters-button'>Go Filter</button>
        </div>
    )
}