import { IMarker } from '@/interfaces/IMarkers';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { markers: IMarker[]; filter: string; active: string } = {
	markers: [],
	filter: '',
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

		updateMarker: (state, action: { payload: { oldName: string; newMarker: IMarker } }) => {
			const markerIndex = state.markers.findIndex((marker) => marker.name === action.payload.oldName);
			state.markers.splice(markerIndex, 1, action.payload.newMarker);
		},

		deleteMarker: (state, action: { payload: { name: string } }) => {
			const markerIndex = state.markers.findIndex((marker) => marker.name === action.payload.name);
			state.markers.splice(markerIndex, 1);
		},

		setFilter: (state, action: { payload: { filter: string } }) => {
			state.filter = action.payload.filter;
		},
	},
});
