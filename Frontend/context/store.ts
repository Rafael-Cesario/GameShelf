import { configureStore } from '@reduxjs/toolkit';
import { sliceNotification } from './sliceNotification';
import { sliceMarker } from '@/features/index/slices/marker';
import { sliceGames } from '@/features/index/slices/games';

export const store = configureStore({
	reducer: {
		notification: sliceNotification.reducer,
		marker: sliceMarker.reducer,
		games: sliceGames.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
