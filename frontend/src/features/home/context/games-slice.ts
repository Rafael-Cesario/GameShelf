import { createSlice } from "@reduxjs/toolkit";

interface GameSlice {
	search: string;
}

const defaultValues: GameSlice = {
	search: "",
};

export const gamesSlice = createSlice({
	name: "games",
	initialState: defaultValues,
	reducers: {
		setSearch(state, action: { payload: string }) {
			state.search = action.payload;
		},
	},
});

export const { setSearch } = gamesSlice.actions;
