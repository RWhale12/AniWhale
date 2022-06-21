import React from 'react';
import './AnimeCard.scss'


type CardProps = {
    id: number;
    name: string;
    image: string;
    rating: number;
}

export const AnimeCard = (props: CardProps) => {

    return (
        <div className='anime-card' >
            <img className='anime-card__image' src={props.image} alt="" ></img>
            <div className='anime-card__image-hover'>
                <label className='anime-card__image-hover--name'>{props.name}</label>
                <div className='anime-card__image-hover--rating'>{props.rating}</div>
            </div>
        </div>
    )
}