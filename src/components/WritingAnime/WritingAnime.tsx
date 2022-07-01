import { useEffect, useState } from "react";
import { InferencePriority } from "typescript";
import { ReadingAnime } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCardOutputAnime, fetchCountPages } from "../../redux/slices";
import { AnimeCard } from "../AnimeCard";
import { Filters } from "../Filters";
import { Loader } from "../Loader";
import './WritingAnime.scss'

type WritingAnimeProps = {
    page: number;
    url: string;
    filters: boolean;
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
            const infoPage = ReadingAnime(page, 30, url);
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

    function createMassPages() {
        const array = [];
        if (selectorPages) {
            if (page <= 5) {
                for (let i = 0; i <= 10; i++)
                    array.push(i + 1);
                array.push('...')
                array.push(selectorPages)
            } else if (page >= 4 && selectorPages - page > 6) {
                array.push(1);
                array.push('...')
                for (let i = page - 4; i <= page + 4; i++)
                    array.push(i + 1);
                array.push('...')
                array.push(selectorPages);
            }
            else if (selectorPages - page <= 6) {
                array.push(1);
                array.push('...')
                for (let i = selectorPages - 11; i <= selectorPages - 1; i++) {
                    array.push(i + 1);
                }
            }

        }
        return array;
    }

    return (
        <div className="animes">
            {props.filters && <Filters updateData={(value) => updateData(value)} />}
            {selector && <div className='animes-div'>
                {selector.map(el => {
                    return <AnimeCard name={el.name} id={el.id} image={el.image} rating={el.rating} genres={el.genres} />
                })}
            </div>}
            {!selector && <Loader />}
            <div className="animes--pages-buttons">

                {selectorPages && createMassPages().map(pageAnime => {
                    if (page === pageAnime)
                        return <div className="animes--number-page-active animes--number-page">{pageAnime}</div>
                    if (typeof pageAnime === 'string') {
                        return <div className="animes--number-page">{pageAnime}</div>
                    } else
                        return <div className="animes--number-page" onClick={() => setPage(pageAnime)}>{pageAnime}</div>
                })}
            </div>
        </div>
    )
}