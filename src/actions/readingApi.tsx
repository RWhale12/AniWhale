import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { IGenres } from '../components/Filters/Filters';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Card, fetchCountPages } from '../redux/slices/cardSlice';

export type Character = {
    name: string;
    image: string;
    role: string;
}

export type Relations = {
    relation: string;
    entry: Relation[];
}

export type Relation = {
    mal_id: number,
    type: string,
    name: string,
}




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
                    genres: anime.genres.map((el: any) => new Object({ name: el.name, id: el.mal_id })),
                    realeseYear: anime.aired.prop.from.year,
                    rating: anime.rating,
                })

            });
            console.log(massThisPageAnime);
            if (limit > 15) {
                return [massThisPageAnime, user.pagination.last_visible_page];
            } else if (limit === 15) {
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

export async function ReadingSpecificAnimeCharacters(id: number) {

    try {
        const arrayCharachters: Character[] = [];
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/characters`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const characterInfo = await response.json();

        if (response.ok || response.status === 200) {
            characterInfo.data.map((character: any) => {
                arrayCharachters.push({
                    name: character.character.name,
                    image: character.character.images.jpg.image_url,
                    role: character.role,
                })
            })
            return arrayCharachters;
        };


    } catch (e) {
        console.log(`Error ${e}`)
    }
}


export async function ReadingSpecificAnimeRelations(id: number) {

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/relations`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const relationsInfo = await response.json();

        if (response.ok || response.status === 200) {

            const relations = {
                story: relationsInfo.data,
            }
            return relations;
        };


    } catch (e) {
        console.log(`Error ${e}`)
    }
}

export async function ReadingSpecificAnimePicAndVid(id: number, type: string) {

    try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/${type}`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const dataInfo = await response.json();

        if (response.ok || response.status === 200) {
            let data: String[] = []
            if (type === 'pictures') {
                dataInfo.data.map((item: any) => {
                    data.push(item.jpg.large_image_url);
                })
            }
            return data;
        };


    } catch (e) {
        console.log(`Error ${e}`)
    }
}


export async function ReadingSpecificAnime(id: number) {

    try {

        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const animeInfo = await response.json();

        if (response.ok || response.status === 200) {
            const anime = {
                tittle: animeInfo.data.title,
                tittle_jap: animeInfo.data.title_japanese,
                image: animeInfo.data.images.jpg.large_image_url,
                rating: animeInfo.data.rating,
                type: animeInfo.data.type,
                duration: animeInfo.data.duration,
                episodes: animeInfo.data.episodes,
                trailer: animeInfo.data.trailer.youtube_id,
                aired: animeInfo.data.aired.string,
                source: animeInfo.data.source,
                status: animeInfo.data.status,
                synopsis: animeInfo.data.synopsis,
                studios: animeInfo.data.studios[0].name,
                producers: animeInfo.data.producers.map((el: any) => el.name),
                genres: animeInfo.data.genres.map((el: any) => new Object({ name: el.name, id: el.mal_id })),
            }
            return anime;
        };


    } catch (e) {
        console.log(`Error ${e}`)
    }
}

