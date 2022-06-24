import { ReadingAnime } from "../../actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { fetchCard } from "../../redux/slices";
import { AnimeCard } from "../AnimeCard";
import './WritingAnime.scss'



export const WritingAnime = () => {
    const selector = useAppSelector(state => state.cardSliceReduser.content)
    const dispatch = useAppDispatch();

    function toggle() {
        const page = (document.querySelector('.input-page') as HTMLInputElement).value;
        const infoPage = ReadingAnime(Number(page))
            .then(anime => {
                if (anime)
                    dispatch(fetchCard(anime))
                console.log(anime)
            });
    }

    return (
        <div className="anime">
            <input className='input-page'></input>
            <button onClick={() => toggle()}>GO</button>
            <div className='animes-div'>
                {selector && selector.map(el => {
                    return <AnimeCard name={el.name} id={el.id} image={el.image} rating={el.rating} genres={el.genres} />
                })}
            </div>
        </div>
    )
}