import { IGame } from '@/interfaces/IGames';
import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../interfaces/iFilters';

interface SGames {
	games: IGame[];
	searchGame: string;
	filters: IFilters;
}

const initialState: SGames = {
	games: [],
	searchGame: '',
	filters: {
		tags: [],
		genre: [],
		rate: '',
	},
};

export const sliceGames = createSlice({
	name: 'Games',
	initialState,

	reducers: {
		setGames: (state, action: { payload: { games: IGame[] } }) => {
			const { games } = action.payload;
			state.games = games;
		},

		setSearchGame: (state, action: { payload: { searchGameValue: string } }) => {
			const { searchGameValue } = action.payload;
			state.searchGame = searchGameValue;
		},

		setFilters: (state, action: { payload: { newFilters: IFilters } }) => {
			state.filters = action.payload.newFilters;
		},
	},
});
