import { useEffect, useState } from "react";
import { InferencePriority } from "typescript";
import { ReadingAnime } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCardOutputAnime, fetchCountPages } from "../../redux/slices";
import { AnimeCard } from "../AnimeCard";
import { ButtonPages } from "../ButtonPages";
import { Filters } from "../Filters";
import { Loader } from "../Loader";
import './WritingAnime.scss'

type WritingAnimeProps = {
    page: number;
    url: string;
    filters?: boolean;
    top?: boolean;
    new?: boolean;
}

export const WritingAnime = (props: WritingAnimeProps) => {

    const selector = useAppSelector(state => state.cardSliceReduser.contentOutputAnime);
    const selectorPages = useAppSelector(state => state.cardSliceReduser.countPages);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState(props.page);
    const [url, setUrl] = useState(props.url);

    useEffect(() => {
        dispatch(fetchCardOutputAnime(null))
        const timerAnime = setTimeout(() => {
            const infoPage = ReadingAnime(page, 25, url);
            infoPage
                .then(anime => {
                    if (anime) {
                        dispatch(fetchCardOutputAnime(anime[0]))
                        dispatch(fetchCountPages(anime[1]))
                    }
                });
        }, 1000)
        return () => { clearTimeout(timerAnime) }
    }, [page, url]);

    function updateData(value: string) {
        setUrl(value);
        setPage(1);
    }

    function updatePage(value: number) {
        setPage(value);
    }

    return (
        <div className="animes">
            {props.filters && <Filters updateData={(value) => updateData(value)} />}
            {selector && selector.length > 0 && <div className='animes-div'>
                {selector.map(el => {
                    return <AnimeCard name={el.name} id={el.id} image={el.image} score={el.score} genres={el.genres} year={el.realeseYear} rating={el.rating}/>
                })}
            </div>}
            {!selector && <Loader />}
            {selector?.length === 0 && <label className="animes--noresult">no result</label>}
            {selector && selector.length > 0 && <ButtonPages page={page} updatePage={(value) => updatePage(value)} top={props.top} new={props.new}/>}
        </div>
    )
}