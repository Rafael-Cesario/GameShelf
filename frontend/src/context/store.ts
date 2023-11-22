import { configureStore } from "@reduxjs/toolkit";
import { notificationSlice } from "./notification-slice";
import { collectionSlice } from "@/features/home/context/collection-slice";

export const store = configureStore({
	reducer: {
		notification: notificationSlice.reducer,
		collection: collectionSlice.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
