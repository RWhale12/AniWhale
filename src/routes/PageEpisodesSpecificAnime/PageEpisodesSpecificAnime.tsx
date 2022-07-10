import { useEffect, useState } from 'react';
import { Episodes, ReadingAnimeEpisoder } from '../../actions/readingApi';
import { ButtonPages } from '../../components/ButtonPages';
import { Episode } from '../../components/Episode';
import { Loader } from '../../components/Loader';
import './PageEpisodesSpecificAnime.scss'

type PageEpisodesSpecificAnimeProps = {
    id: number;
}

export const PageEpisodesSpecificAnime = (props: PageEpisodesSpecificAnimeProps) => {
    const [page, setPage] = useState(1);
    const [arrayEpisodes, setArrayEpisodes] = useState<Array<Episodes>>();
    const [countPages, setCountPages] = useState(1);

    useEffect(() => {
        const timerAnime = setTimeout(() => {
            const infoPage = ReadingAnimeEpisoder(page, props.id);
            infoPage
                .then(anime => {
                    if (anime) {
                        setArrayEpisodes(anime[0]);
                        setCountPages(anime[1]);
                    }
                });
        }, 1000)
        return () => { clearTimeout(timerAnime) }
    }, [page]);

    function updatePage(value: number) {
        setPage(value);
    }

    return (
        <div className='episodes'>
            {!arrayEpisodes && <Loader/>}
            <div className='episodes--div'>
                {arrayEpisodes &&
                    arrayEpisodes.map((item: Episodes) => {
                        return <Episode id={item.id} title={item.title} jTitle={item.jTitle} url={item.url}/>
                    })
                }
            </div>
            {arrayEpisodes && <ButtonPages page={page} updatePage={(value) => updatePage(value)} countPages={countPages} />}
        </div>
    )
}