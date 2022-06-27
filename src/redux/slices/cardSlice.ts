import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Card = {
    id: number;
    name: string;
    image: string;
    type: string;
    episodes: number;
    rating: number;
    genres: [];
}

interface ICardState {
    contentPopAnime: Array<Card> | null;
    contentOutputAnime: Array<Card> | null;
}

const initialState: ICardState = {
    contentPopAnime: null,
    contentOutputAnime: null,
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers:{
        fetchCardPopAnime: (state, action: PayloadAction<Array<Card>>) => {
            state.contentPopAnime = action.payload;
        },
        fetchCardOutputAnime: (state, action: PayloadAction<Array<Card>>) => {
            state.contentOutputAnime = action.payload;
        },
    }
})

export const { fetchCardPopAnime, fetchCardOutputAnime } = cardSlice.actions;

export default cardSlice.reducer;