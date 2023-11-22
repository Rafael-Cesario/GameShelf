import { CollectionModel } from "@/services/interfaces/collection";
import { GameModel } from "@/services/interfaces/game";
import { createSlice } from "@reduxjs/toolkit";

interface CollectionSlice {
	allGames: CollectionModel;
	collections: CollectionModel[];
	activeCollection: string;
	search: string;
}

const defaultValues: CollectionSlice = {
	allGames: { id: "0", name: "Todos", userID: "", games: [] },
	collections: [],
	activeCollection: "0",
	search: "",
};

export const collectionSlice = createSlice({
	name: "collection",
	initialState: defaultValues,
	reducers: {
		setCollections(state, action: { payload: { collections: CollectionModel[] } }) {
			state.collections = action.payload.collections;
		},

		setCreateCollection(state, action: { payload: { collection: CollectionModel } }) {
			state.collections.push(action.payload.collection);
			state.activeCollection = action.payload.collection.id;
			console.log(action.payload.collection.id);
		},

		setActiveCollection(state, action: { payload: string }) {
			state.activeCollection = action.payload;
		},

		setSearch(state, action: { payload: string }) {
			state.search = action.payload;
		},

		setAllGames(state, action: { payload: { games: GameModel[]; userID: string } }) {
			state.allGames.userID = action.payload.userID;
			state.allGames.games = action.payload.games;
		},
	},
});

export const { setCreateCollection, setCollections, setActiveCollection, setSearch, setAllGames } = collectionSlice.actions;
