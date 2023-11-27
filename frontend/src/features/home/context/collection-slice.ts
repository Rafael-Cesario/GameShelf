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

		setCollectionGames(state, action: { payload: { collectionID: string; game: GameModel } }) {
			state.allGames.games.push(action.payload.game);
			state.collections.forEach((c) => {
				const sameCollection = c.id === action.payload.collectionID;
				if (sameCollection) c.games.push(action.payload.game);
			});
		},

		setCollectionUpdate(state, action: { payload: CollectionModel }) {
			const index = state.collections.findIndex((c) => c.id === action.payload.id);
			state.collections.splice(index, 1, action.payload);
		},

		setCollectionDelete(state, action: { payload: { collectionID: string } }) {
			const index = state.collections.findIndex((c) => c.id === action.payload.collectionID);
			state.collections.splice(index, 1);
		},

		setAllGamesUpdateOne(state, action: { payload: GameModel }) {
			const gameIndex = state.allGames.games.findIndex((game) => game.id === action.payload.id);
			state.allGames.games[gameIndex].collections = action.payload.collections;
		},

		setRemoveGames(state, action: { payload: { removedCollections: CollectionModel[]; removeGame: { id: number } } }) {
			action.payload.removedCollections.forEach((gameCollection) => {
				const collectionIndex = state.collections.findIndex((userCollection) => gameCollection.id === userCollection.id);
				const gameIndex = state.collections[collectionIndex].games.findIndex((game) => game.id === action.payload.removeGame.id);
				if (gameIndex > -1) state.collections[collectionIndex].games.splice(gameIndex, 1);
			});
		},

		setAddGames(state, action: { payload: { addCollections: { id: string }[]; game: GameModel } }) {
			action.payload.addCollections.forEach((collection) => {
				const collectionIndex = state.collections.findIndex((userCollection) => userCollection.id === collection.id);
				const gameIndex = state.collections[collectionIndex].games.findIndex((game) => game.id === action.payload.game.id);
				if (gameIndex < 0) state.collections[collectionIndex].games.push(action.payload.game);
			});
		},
	},
});

export const {
	setCreateCollection,
	setCollections,
	setActiveCollection,
	setSearch,
	setAllGames,
	setCollectionGames,
	setCollectionUpdate,
	setCollectionDelete,
	setAllGamesUpdateOne,
	setRemoveGames,
	setAddGames,
} = collectionSlice.actions;
