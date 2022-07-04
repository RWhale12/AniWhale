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

export type SpecificAnime = {
    tittle: string;
    tittle_jap: string;
    image: string;
    rating: string;
    type: string;
    duration: string;
    episodes: number;
    trailer: string;
    aired: string;
    source: string;
    status: string;
    synopsis: string;
    studios: string;
    producers: [];
    genres: [];
}

interface ICardState {
    countPages: number | null;
    contentPopAnime: Array<Card> | null;
    contentOutputAnime: Array<Card> | null;
    contentSpecificAnime: SpecificAnime | null;
}

const initialState: ICardState = {
    countPages: null,
    contentPopAnime: null,
    contentOutputAnime: null,
    contentSpecificAnime: null,
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers: {
        fetchCardPopAnime: (state, action: PayloadAction<Array<Card>>) => {
            state.contentPopAnime = action.payload;
        },
        fetchCardOutputAnime: (state, action: PayloadAction<any>) => {
            state.contentOutputAnime = action.payload;
        },
        fetchCountPages: (state, action: PayloadAction<number>) => {
            state.countPages = action.payload;
        },
        fetchSpecificAnime: (state, action: PayloadAction<SpecificAnime | null>) => {
            state.contentSpecificAnime = action.payload;
        }
    }
})

export const { fetchCardPopAnime, fetchCardOutputAnime, fetchCountPages, fetchSpecificAnime} = cardSlice.actions;

export default cardSlice.reducer;