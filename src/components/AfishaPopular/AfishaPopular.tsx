import { CSSProperties, useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import './AfishaPopular.scss'
import { Card, fetchCardPopAnime } from '../../redux/slices/cardSlice';
import { AnimeCard } from '../AnimeCard';
import { ReadingAnime } from '../../actions';

type AfishaPopularProps = {

}

export const AfishaPopular = () => {
    const selector = useAppSelector(state => state.cardSliceReduser.contentPopAnime)
    const dispatch = useAppDispatch();
    const [tape, setTape] = useState(0);
    document.querySelector(`.afisha-popular--page${tape}`)?.classList.add('afisha-popular--page-active')
    const textTape = ['THE BEST ANIME ONLINE', 'POPULAR ANIME', 'ANIME ONLINE', 'ANIME TV', 'NEW AND OLD ANIME']

    let subarray = [];
    const size = 3;
    let interval = 6000;

    if (selector) {
        for (let i = 0; i < Math.ceil(selector.length / size); i++) {
            subarray[i] = selector.slice((i * size), (i * size) + size);
        }
    }

    useEffect(() => {
        document.querySelector(`.afisha-popular--animes`)?.classList.add('afisha-popular--animes-animation');
        document.querySelector(`.afisha-popular--text`)?.classList.add('afisha-popular--text-animation');
        const timer = setTimeout(function () {

            document.querySelector(`.afisha-popular--animes`)?.classList.remove('afisha-popular--animes-animation');
            document.querySelector(`.afisha-popular--text`)?.classList.remove('afisha-popular--text-animation');
            
            document.querySelector(`.afisha-popular--page${tape}`)?.classList.remove('afisha-popular--page-active')
            setTape(tape + 1);
            if (tape === 4) setTape(0);
            document.querySelector(`.afisha-popular--page${tape + 1}`)?.classList.add('afisha-popular--page-active');

        }, interval)
        return () => {clearTimeout(timer);}
    }, [tape])


    return (
        <div className='afisha-popular'>
            <div className='afisha-popular--bg'></div>
            <div className='afisha-popular--animes'>
                {selector && subarray[tape].map(el => {
                    return <AnimeCard name={el.name} id={el.id} image={el.image} rating={el.rating} genres={el.genres} />
                })}
            </div>
            <label htmlFor="" className='afisha-popular--text'>{textTape[tape]}</label>
            <div className='afisha-popular--pages'>
                <div className='afisha-popular--page afisha-popular--page0'></div>
                <div className='afisha-popular--page afisha-popular--page1'></div>
                <div className='afisha-popular--page afisha-popular--page2'></div>
                <div className='afisha-popular--page afisha-popular--page3'></div>
                <div className='afisha-popular--page afisha-popular--page4'></div>
            </div>
        </div>
    )
}