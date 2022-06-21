import { useDispatch, useSelector } from 'react-redux'
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchCard } from '../redux/slices';
import { Card } from '../redux/slices/cardSlice';

export async function ReadingAnime(page: number) {

    try {

        const massThisPageAnime: Card[] = [];
        const response = await fetch(`https://api.jikan.moe/v4/anime?page=${page}&limit=30&score=0`, {
            method: "GET",
            headers: {
                'Accept': 'application/json',
            },
        });

        const user = await response.json();

        if (response.ok || response.status === 200) {
            // const selector = useAppSelector(state => state.cardSliceReduser.content)
            // const dispatch = useAppDispatch();
            user.data.map((anime: any) => {
                massThisPageAnime.push({
                    name: anime.title,
                    episodes: anime.episodes,
                    type: anime.type,
                    id: anime.mal_id,
                    image: anime.images.jpg.large_image_url,
                    rating: anime.score,
                })
            })
            return massThisPageAnime;
        }


    } catch (e) {
        console.log(`Error ${e}`)
    }
}

export function writePromise(promise: any) {

}