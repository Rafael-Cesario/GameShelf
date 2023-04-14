import mongoose from 'mongoose';
import { index, prop, getModelForClass, PropType } from '@typegoose/typegoose';

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

class Filters {
	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	tags!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	genre!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	rate!: string[];
}

export const ModelMarkers = getModelForClass(Markers);
