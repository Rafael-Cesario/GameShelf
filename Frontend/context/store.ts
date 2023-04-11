import { configureStore } from '@reduxjs/toolkit';
import { sliceNotification } from './sliceNotification';

export const store = configureStore({
	reducer: {
		notification: sliceNotification.reducer,
	},
});

export type Store = ReturnType<typeof store.getState>;
