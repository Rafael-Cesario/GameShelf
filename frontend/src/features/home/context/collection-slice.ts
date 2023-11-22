import { CollectionModel } from "@/services/interfaces/collection";
import { createSlice } from "@reduxjs/toolkit";

interface CollectionSlice {
	collections: CollectionModel[];
	activeCollection: string;
	search: string;
}

const defaultValues: CollectionSlice = {
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
		},

		setActiveCollection(state, action: { payload: string }) {
			state.activeCollection = action.payload;
		},

		setSearch(state, action: { payload: string }) {
			state.search = action.payload;
		},
	},
});

export const { setCreateCollection, setCollections, setActiveCollection , setSearch} = collectionSlice.actions;
