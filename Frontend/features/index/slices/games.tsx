import { IGame } from '@/interfaces/IGames';
import { createSlice } from '@reduxjs/toolkit';

interface SGames {
	games: IGame[];
}

const initialState: SGames = {
	games: [],
};

export const sliceGames = createSlice({
	name: 'Games',
	initialState,

	reducers: {
		setGames: (state, action: { payload: { games: IGame[] } }) => {
			const { games } = action.payload;
			state.games = games;
		},
	},
});
