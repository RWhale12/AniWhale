import React from 'react';
import './AnimeCard.scss'

import markNotCheked from '../../icons/markNotCheked.png'


type CardProps = {
    id: number;
    name: string;
    image: string;
    rating: number;
    genres: [];
}

export const AnimeCard = (props: CardProps) => {

    return (
        <div className='anime-card' >
            <div className='div-info'></div>
            <img className='anime-card__image' src={props.image} alt="" ></img>
            <div className='anime-card__image-hover'>
                <div className='anime-card__image-hover--top-div'>
                    <div className='anime-card__image-hover--button anime-card__image-hover--button-like'>
                        <img src={markNotCheked} alt="" className='anime-card__image-hover--button-like'/>
                    </div>
                </div>
                <label className='anime-card__image-hover--name'>{props.name}</label>
                <div className='anime-card__image-hover--div-genres'>{props.genres.map(genres => {
                    return <div className='anime-card__image-hover--genres'>{genres}</div>
                })}</div>
                <div className='anime-card__image-hover--rating'>{props.rating}</div>
            </div>
        </div>
    )
}