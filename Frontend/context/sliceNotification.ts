import { createSlice } from '@reduxjs/toolkit';

interface Notification {
	isOpen: boolean;
	type: 'Erro' | 'Sucesso';
	txt: string;
}

const initialState: Notification = {
	isOpen: false,
	type: 'Erro',
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
