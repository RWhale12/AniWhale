import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { IGenres } from '../components/Filters/Filters';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Card, fetchCountPages } from '../redux/slices/cardSlice';

export async function ReadingAnime(page: number, limit: number, parametrs: string) {
    try {
        const massThisPageAnime: Card[] = [];
        const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=${limit}&sfw=false&${parametrs}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const user = await response.json();

        if (response.ok || response.status === 200) {
            user.data.map((anime: any) => {
                massThisPageAnime.push({
                    name: anime.title,
                    episodes: anime.episodes,
                    type: anime.type,
                    id: anime.mal_id,
                    image: anime.images.jpg.large_image_url,
                    score: anime.score,
                    genres: anime.genres.map((el: any) => new Object({name:el.name, id:el.mal_id})),
                    realeseYear: anime.aired.prop.from.year,
                    rating: anime.rating,
                })

            });
            console.log(massThisPageAnime);
            if (limit > 15) {
                return [massThisPageAnime, user.pagination.last_visible_page];
            } else if(limit === 15){
                return massThisPageAnime;
            }
        }



    } catch (e) {
        console.log(`Error ${e}`)
    }
}

export async function ReadingGenres() {

    try {

        const massGenres: IGenres[] = [];
        const response = await fetch(`https://api.jikan.moe/v4/genres/anime`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const genres = await response.json();

        if (response.ok || response.status === 200) {
            genres.data.map((genres: any) => {
                massGenres.push({
                    id: genres.mal_id,
                    name: genres.name,
                })

            });
            return massGenres;
        }

    } catch (e) {
        console.log(`Error ${e}`)
    }
}


export async function ReadingSpecificAnime() {

    try {

        const massGenres: IGenres[] = [];
        const response = await fetch(`https://api.jikan.moe/v4/genres/anime`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const genres = await response.json();

        if (response.ok || response.status === 200) {
            genres.data.map((genres: any) => {
                massGenres.push({
                    id: genres.mal_id,
                    name: genres.name,
                })

            });
            return massGenres;
        }

    } catch (e) {
        console.log(`Error ${e}`)
    }
}

