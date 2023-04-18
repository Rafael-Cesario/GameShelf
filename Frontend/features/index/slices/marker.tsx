import { IMarker } from '@/interfaces/IMarkers';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { markers: IMarker[]; active: string } = {
	markers: [],
	active: 'todos',
};

export const sliceMarker = createSlice({
	name: 'Marker',
	initialState,

	reducers: {
		setMarkers: (state, action: { payload: { newMarkers: IMarker[] } }) => {
			state.markers = action.payload.newMarkers;
		},

		setActive: (state, action: { payload: { markerName: string } }) => {
			state.active = action.payload.markerName;
		},
	},
});
