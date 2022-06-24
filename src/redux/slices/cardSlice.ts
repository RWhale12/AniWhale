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
    content: Array<Card> | null;
}

const initialState: ICardState = {
    content: null,
}

export const cardSlice = createSlice({
    name: 'card',
    initialState,
    reducers:{
        fetchCard: (state, action: PayloadAction<Array<Card>>) => {
            state.content = action.payload;
        },
    }
})

export const { fetchCard } = cardSlice.actions;

export default cardSlice.reducer;