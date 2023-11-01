import { createSlice } from "@reduxjs/toolkit";

interface Notification {
	isOpen: boolean;
	type: "success" | "error";
	title: string;
	message: string;
}

interface NotificationInput {
	title?: string;
	message: string;
}

const defaultValues: Notification = {
	isOpen: false,
	type: "success",
	title: "",
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState: defaultValues,
	reducers: {
		setNotificationSuccess(state, action: { payload: NotificationInput }) {
			const { title, message } = action.payload;
			state.isOpen = true;
			state.type = "success";
			state.title = title || "Sucesso";
			state.message = message;
		},

		setNotificationError(state, action: { payload: NotificationInput }) {
			const { title, message } = action.payload;
			state.isOpen = true;
			state.type = "error";
			state.title = title || "Erro";
			state.message = message;
		},

		setNotificationClose(state) {
			state.isOpen = false;
		},
	},
});

export const { setNotificationClose, setNotificationError, setNotificationSuccess } = notificationSlice.actions;
