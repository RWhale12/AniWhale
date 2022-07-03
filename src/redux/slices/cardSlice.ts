import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Card = {
    id: number;
    name: string;
    image: string;
    type: string;
    episodes: number;
    score: number;
    genres: [];
    realeseYear: number;
    rating: string;
}

interface ICardState {
    countPages: number | null;
    contentPopAnime: Array<Card> | null;
    contentOutputAnime: Array<Card> | null;
    idGenres: string | null;
}

const initialState: ICardState = {
    countPages: null,
    contentPopAnime: null,
    contentOutputAnime: null,
    idGenres: null,
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers:{
        fetchCardPopAnime: (state, action: PayloadAction<Array<Card>>) => {
            state.contentPopAnime = action.payload;
        },
        fetchCardOutputAnime: (state, action: PayloadAction<any>) => {
            state.contentOutputAnime = action.payload;
        },
        fetchCountPages: (state, action: PayloadAction<number>) => {
            state.countPages = action.payload;
        },
        fetchIdGenres: (state, action: PayloadAction<string>) => {
            state.idGenres = action.payload;
        }
    }
})

export const { fetchCardPopAnime, fetchCardOutputAnime, fetchCountPages, fetchIdGenres } = cardSlice.actions;

export default cardSlice.reducer;