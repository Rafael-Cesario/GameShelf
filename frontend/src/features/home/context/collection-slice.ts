import { CollectionModel } from "@/services/interfaces/collection";
import { createSlice } from "@reduxjs/toolkit";

interface CollectionSlice {
	collections: CollectionModel[];
	activeCollection: string | null;
}

const defaultValues: CollectionSlice = {
	collections: [],
	activeCollection: null,
};

export const collectionSlice = createSlice({
	name: "collection",
	initialState: defaultValues,
	reducers: {
		setCreateCollection(state, action: { payload: { collection: CollectionModel } }) {
			state.collections.push(action.payload.collection);
			state.activeCollection = action.payload.collection.id;
		},
	},
});

export const { setCreateCollection } = collectionSlice.actions;
