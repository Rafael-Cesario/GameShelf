import { IGame } from '@/interfaces/IGames';
import { createSlice } from '@reduxjs/toolkit';

interface SGames {
	games: IGame[];
	filter: string;
}

const initialState: SGames = {
	games: [],
	filter: '',
};

export const sliceGames = createSlice({
	name: 'Games',
	initialState,

	reducers: {
		setGames: (state, action: { payload: { games: IGame[] } }) => {
			const { games } = action.payload;
			state.games = games;
		},

		setFilter: (state, action: { payload: { filter: string } }) => {
			const { filter } = action.payload;
			state.filter = filter;
		},
	},
});
