import React from 'react';
import './AnimeCard.scss'


type CardProps ={
    id: number;
    name: string;
    image: string;
}

export const AnimeCard = (props: CardProps) => {

    return(
        <div className='anime-card'>
            <img className='anime-card__image' src={props.image} alt="" ></img>
            {/* <label className='anime-card__name'>{props.name}</label> */}
        </div>
    )
}