import { IGame } from '@/interfaces/IGames';
import { createSlice } from '@reduxjs/toolkit';
import { IFilters } from '../interfaces/iFilters';

export interface IGameDetails {
	isOpen: '' | 'details' | 'edit';
	gameName: string;
}

interface SGames {
	games: IGame[];
	searchGame: string;
	gameDetails: IGameDetails;
	filters: IFilters;
}

const initialState: SGames = {
	games: [],
	searchGame: '',
	gameDetails: { isOpen: '', gameName: '' },
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

		setGameDetails: (state, action: { payload: { gameDetails: IGameDetails } }) => {
			state.gameDetails = action.payload.gameDetails;
		},
	},
});
