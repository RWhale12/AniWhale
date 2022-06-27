import { useEffect, useState } from "react";
import { ReadingAnime } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCardOutputAnime } from "../../redux/slices";
import { AnimeCard } from "../AnimeCard";
import './WritingAnime.scss'

type WritingAnimeProps = {
    page: number;
}

export const WritingAnime = (props:WritingAnimeProps) => {
    const selector = useAppSelector(state => state.cardSliceReduser.contentOutputAnime)
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(props.page);
    const pages: number[] = [];

    useEffect(() => {
        // const timerAnime = setTimeout(() => {
            const infoPage = ReadingAnime(page, 30, 'score=8')
                .then(anime => {
                    if (anime)
                        dispatch(fetchCardOutputAnime(anime))
                });
        // }, 1000)
        // return () => {clearTimeout(timerAnime)}
    }, [page]);

    for(let i=0; i<=10; i++) pages[i] = i+1;

    return (
        <div className="animes">
            <div className='animes-div'>
                {selector && selector.map(el => {
                    return <AnimeCard name={el.name} id={el.id} image={el.image} rating={el.rating} genres={el.genres} />
                })} 
            </div>
            <div className="animes--pages-buttons">
                {pages.map((page) => {
                    return <div className="animes--number-page" onClick={() => setPage(page)}>{page}</div>
                })}
            </div>
        </div>
    )
}