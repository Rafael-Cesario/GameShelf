import { IMarker } from '@/interfaces/IMarkers';
import { createSlice } from '@reduxjs/toolkit';

const initialState: { markers: IMarker[] } = {
	markers: [],
};

export const sliceMarker = createSlice({
	name: 'Marker',
	initialState,

	reducers: {
		setMarkers: (state, action: { payload: { newMarkers: IMarker[] } }) => {
			state.markers = action.payload.newMarkers;
		},
	},
});
