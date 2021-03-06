import './AnimeCard.scss'
import '../../components/Animation.scss'
import { Link } from 'react-router-dom';


type CardProps = {
    id: number;
    name: string;
    image: string;
    score: number;
    genres: { name: string, id: string }[];
    year: number;
    rating: string;
}

export const AnimeCard = (props: CardProps) => {
    return (
        // <Link to={`/anime/${props.id}`}>
            <div className='anime-card' >
                <img className='anime-card__image' src={props.image} alt="" ></img>
                <div className='anime-card__image-hover'>
                    <div className='anime-card__image-hover--top-div'>
                        <div className='anime-card__image-hover--top-div--children'>
                            {props.rating && <div className='anime-card__image-hover--info'>{props.rating.split(' ')[0]}</div>}
                            <div className='anime-card__image-hover--info'>{props.year}</div>

                        </div>
                    </div>
                    <label className='anime-card__image-hover--name'>{props.name}</label>
                    <div className='anime-card__image-hover--div-genres'>
                        {props.genres.map(genres => {
                            return <Link to={`/genres/${genres.name}/${genres.id}`}>
                                <div className='anime-card__image-hover--genres'>{genres.name}</div>
                            </Link>

                        })}</div>
                    {props.rating && <div className='anime-card__image-hover--rating'>{props.score}</div>}
                    {!props.rating && <div className='anime-card__image-hover--rating'>no score</div>}
                </div>
            </div>
        // </Link>
    )
}