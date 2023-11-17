import { createSlice } from "@reduxjs/toolkit";

interface INotification {
	isOpen: boolean;
	type: "success" | "error";
	title: string;
	message: string;
}

interface PayloadNotification {
	title?: string;
	message: string;
}

const defaultValues: INotification = {
	isOpen: false,
	type: "success",
	title: "",
	message: "",
};

export const notificationSlice = createSlice({
	name: "notification",
	initialState: defaultValues,

	reducers: {
		setSuccessNotification(state, action: { payload: PayloadNotification }) {
			state.isOpen = true;
			state.type = "success";
			state.title = action.payload.title || "Sucesso";
			state.message = action.payload.message;
		},

		setErrorNotification(state, action: { payload: PayloadNotification }) {
			state.isOpen = true;
			state.type = "error";
			state.title = action.payload.title || "Erro";
			state.message = action.payload.message;
		},

		setCloseNotification(state, action) {
			state.isOpen = false;
		},
	},
});

export const { setCloseNotification, setErrorNotification, setSuccessNotification } = notificationSlice.actions;
