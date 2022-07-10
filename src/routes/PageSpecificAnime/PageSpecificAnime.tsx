import { getAuth } from 'firebase/auth';
import { setDoc, doc, getDocs, deleteDoc } from 'firebase/firestore';
import { useState } from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Character, ReadingSpecificAnime, ReadingSpecificAnimeCharacters, ReadingSpecificAnimePicAndVid, ReadingSpecificAnimeRelations, Relation, Relations } from '../../actions/readingApi';
import { Loader } from '../../components/Loader';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { fetchSpecificAnime } from '../../redux/slices';
import './PageSpecificAnime.scss'
import { db } from '../../index'
import { collection, query, where } from "firebase/firestore";


type PageSpecificAnimeProps = {
    id: number;
}

export const PageSpecificAnime = (props: PageSpecificAnimeProps) => {
    const auth = getAuth();

    const selectorAnime = useAppSelector(state => state.cardSliceReduser.contentSpecificAnime);
    const dispatch = useAppDispatch();
    const [arrayCharachters, setArrayCharacters] = useState<Array<Character>>();
    const [relations, setRelations] = useState<Array<any>>();
    const [images, setImages] = useState<Array<String>>();
    const [checkedMyList, setChekedMyList] = useState<boolean>();


    async function searchIdMyList() {
        const mylist = collection(db, `mylist-${auth.currentUser?.uid}`);
        const querySnapshot = await getDocs(query(mylist, where("id", "==", props.id))).then((item) => {
            if (item.size)
                setChekedMyList(true)
            else
                setChekedMyList(false)
        });

    }


    useEffect(() => {
        searchIdMyList();

        dispatch(fetchSpecificAnime(null));
        const timerAnime = setTimeout(() => {

            setTimeout(() => {
                const infoPage = ReadingSpecificAnime(props.id);
                infoPage
                    .then((anime) => {
                        if (anime) {
                            dispatch(fetchSpecificAnime(anime))
                        }
                    })
            }, 2000)
            setTimeout(() => {
                const infoCharacters = ReadingSpecificAnimeCharacters(props.id)
                infoCharacters
                    .then((characters) => {
                        if (characters) {
                            setArrayCharacters(characters)
                        }
                    })
            }, 2000)
            setTimeout(() => {
                const infoRelations = ReadingSpecificAnimeRelations(props.id);
                infoRelations
                    .then((relations) => {
                        if (relations) {
                            console.log(relations.story)
                            setRelations(relations.story);
                        }
                    })
            }, 1000)
            setTimeout(() => {
                const infoPictures = ReadingSpecificAnimePicAndVid(props.id, 'pictures')
                infoPictures
                    .then((pictures) => {
                        if (pictures) {
                            setImages(pictures);
                        }
                    })
            }, 0)

        }, 1000)
        return () => { clearTimeout(timerAnime) }
    }, []);

    async function writeToDataBaseMyList() {
        if (auth.currentUser?.emailVerified) {
            const docRef = await setDoc(doc(db, `mylist-${auth.currentUser?.uid}`, `${props.id}`), {
                id: props.id,
                name: selectorAnime?.tittle,
                image: selectorAnime?.image,
                score: selectorAnime?.score,
                genres: selectorAnime?.genres,
                realeseYear: selectorAnime?.realeseYear,
                rating: selectorAnime?.rating,
            });
            setChekedMyList(true)
        } else {
            alert('Please verify your account')
        }
    }

    async function deleteToDataBaseMyList() {
        await deleteDoc(doc(db, `mylist-${auth.currentUser?.uid}`, `${props.id}`));
        setChekedMyList(false);
    }

    return (
        <div className='specific-anime'>
            {!selectorAnime && <Loader />}
            {selectorAnime &&
                <div className='specific-anime--content'>
                    <div className='specific-anime--content-children specific-anime--content-children-left'>
                        <img src={selectorAnime.image} alt="" className='specific-anime--content-children-left--img' />
                        {!checkedMyList && <button className='specific-anime--content-children-left--btn' onClick={() => writeToDataBaseMyList()}>Add to list</button>}
                        {checkedMyList && <button className='specific-anime--content-children-left--btn' onClick={() => deleteToDataBaseMyList()}>Delete to list</button>}
                        <button className='specific-anime--content-children-left--btn' onClick={() => window.location.assign(`/anime/${props.id}/episodes`)}>Watch</button>
                    </div>
                    <div className='specific-anime--content-children specific-anime--content-children-center'>
                        <label htmlFor="" className='specific-anime--content-children-center--tittle'>{selectorAnime.tittle}</label>
                        <label htmlFor="" className='specific-anime--content-children-center--jtittle'>{selectorAnime.tittle_jap}</label>
                        <div className='specific-anime--content-children-center--line'>
                            {selectorAnime.rating && <span className='specific-anime--content-children-center--line-param'>{selectorAnime.rating.split(' ')[0]}</span>}
                            {selectorAnime.rating && <span className='specific-anime--content-children-center--line-dot'></span>}
                            <span className='specific-anime--content-children-center--line-param'>{selectorAnime.type}</span>
                            <span className='specific-anime--content-children-center--line-dot'></span>
                            {selectorAnime.episodes && <span className='specific-anime--content-children-center--line-param'>Ep {selectorAnime.episodes}</span>}
                            {selectorAnime.episodes && <span className='specific-anime--content-children-center--line-dot'></span>}
                            <span className='specific-anime--content-children-center--line-param'>{selectorAnime.duration.split(' ')[0]}m</span>
                        </div>
                        <label htmlFor="" className='specific-anime--content-children-center--synopsis'>{selectorAnime.synopsis.substring(0, selectorAnime.synopsis.length - 25)}</label>
                    </div>
                    <div className='specific-anime--content-children specific-anime--content-children-right'>
                        <div className='specific-anime--content-children-right-bg'></div>
                        <label htmlFor="" className='specific-anime--content-children-right-param specific-anime--content-children-right-param-tittle'>Info:</label>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Aired:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.aired}</label>
                        </div>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Status:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.status}</label>
                        </div>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Aired:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.score}</label>
                        </div>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Type:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.type}</label>
                        </div>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Source:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.source}</label>
                        </div>

                        <div className='specific-anime--content-children-right-param specific-anime--content-children-right-param-border'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name-genre'>Genres:</label>
                            <div className='specific-anime--content-children-right-param-genres'>
                                {selectorAnime.genres.map((genres: { name: string, id: string }) => {
                                    return <Link to={`/genres/${genres.name}/${genres.id}`}>
                                        <div className='anime-card__image-hover--genres'>{genres.name}</div>
                                    </Link>
                                })}
                            </div>
                        </div>
                        <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Studios:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content'>{selectorAnime.studios}</label>
                        </div>
                        {selectorAnime.producers.length > 0 && <div className='specific-anime--content-children-right-param'>
                            <label htmlFor="" className='specific-anime--content-children-right-param-name'>Produsers:</label>
                            <label htmlFor="" className='specific-anime--content-children-right-param-content' >{selectorAnime.producers.join(', ')}</label>
                        </div>}
                    </div>
                </div>}

            {arrayCharachters && arrayCharachters.length > 0 &&
                <div className='specific-anime--content-character'>
                    <label htmlFor="" className='specific-anime--content--tittle'>Characters:</label>
                    <div className='specific-anime--content-character--div'>

                        {arrayCharachters.map((item: Character) => {
                            if (item.role === 'Main')
                                return (
                                    <div className='specific-anime--content-character--character'>
                                        <img src={item.image} alt="" />
                                        <div>
                                            <label htmlFor="" className='specific-anime--content-character--character-name'>{item.name}</label>
                                            <label htmlFor="" className='specific-anime--content-character--character-role'>{item.role}</label>
                                        </div>
                                    </div>
                                )
                        })}
                    </div>
                </div>}
            {images && images.length > 0 &&
                <div className='specific-anime--content-images'>
                    <label htmlFor="" className='specific-anime--content--tittle'>Images:</label>
                    <div className='specific-anime--content-images--div'>
                        {images.map((image: any) => {
                            return <img src={image} alt="" />
                        })}
                    </div>
                </div>}
            {relations && relations.length > 0 &&
                <div className='specific-anime--content-relations'>
                    <label htmlFor="" className='specific-anime--content--tittle'>Relations:</label>
                    {relations.map((item: Relations) => {
                        return (
                            <div className='specific-anime--content-relations--div-relation'>
                                <label className='specific-anime--content-relations--name-relation'>{item.relation}</label>
                                <div className='specific-anime--content-relations--div'>
                                    {item.entry.map((relation: Relation) => {
                                        return <Link to={`/${relation.type}/${relation.mal_id}`}>
                                            <div className='specific-anime--content-relations--relation'>
                                                <label htmlFor="" className='specific-anime--content-relations--relation-name'>{relation.name}</label>
                                                <label htmlFor="" className='specific-anime--content-relations--relation-type'>{relation.type}</label>
                                            </div>
                                        </Link>
                                    })}
                                </div>
                            </div>
                        )
                    })}
                </div>}
        </div>
    )
}