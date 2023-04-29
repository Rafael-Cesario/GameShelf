import { IGame } from '@/interfaces/IGames';
import { createSlice } from '@reduxjs/toolkit';

interface SGames {
	games: IGame[];
	searchGame: string;
}

const initialState: SGames = {
	games: [],
	searchGame: '',
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
	},
});
