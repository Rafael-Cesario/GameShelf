import { configureStore } from '@reduxjs/toolkit';
import { sliceNotification } from './sliceNotification';
import { sliceMarker } from '@/features/index/slices/marker';

export const store = configureStore({
	reducer: {
		notification: sliceNotification.reducer,
		marker: sliceMarker.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
