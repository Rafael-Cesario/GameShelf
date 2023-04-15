import mongoose from 'mongoose';
import { index, prop, getModelForClass, PropType } from '@typegoose/typegoose';
import { Filters } from './modelFilters';

@index({ email: 1 }, { unique: true })
class Markers {
	@prop({ type: String, lowercase: true, required: true })
	email!: string;

	@prop({ type: mongoose.Schema.Types.Array })
	markers!: Marker[];
}

class Marker {
	@prop({ type: String, lowercase: true })
	name!: string;

	@prop({ type: mongoose.Schema.Types.Map }, PropType.ARRAY)
	filters!: Filters;
}

export const ModelMarkers = getModelForClass(Markers);
