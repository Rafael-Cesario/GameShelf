import { GameModel } from "@/services/interfaces/game";
import { createSlice } from "@reduxjs/toolkit";

interface GameSlice {
	search: string;
	gameData: GameModel | null;
}

const defaultValues: GameSlice = {
	search: "",
	gameData: null,
};

export const gamesSlice = createSlice({
	name: "games",
	initialState: defaultValues,
	reducers: {
		setSearch(state, action: { payload: string }) {
			state.search = action.payload;
		},

		setGameData(state, action: { payload: GameModel | null }) {
			state.gameData = action.payload;
		},
	},
});

export const { setSearch, setGameData } = gamesSlice.actions;
