import { createSlice } from '@reduxjs/toolkit';

interface Notification {
	isOpen: boolean;
	type: 'error' | 'success';
	txt: string;
}

const initialState: Notification = {
	isOpen: false,
	type: 'error',
	txt: '',
};

export const sliceNotification = createSlice({
	name: 'notification',
	initialState,
	reducers: {
		close: (state) => {
			state.isOpen = false;
		},

		sendNotification: (state, action: { payload: typeof state }) => {
			state = { ...action.payload };
		},
	},
});
