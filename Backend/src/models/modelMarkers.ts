import mongoose from 'mongoose';
import { index, prop, getModelForClass, PropType } from '@typegoose/typegoose';

class Filters {
	@prop({ type: String, lowercase: true })
	tags!: string[];

	@prop({ type: String, lowercase: true })
	genre!: string[];

	@prop({ type: mongoose.Schema.Types.Array, lowercase: true })
	rate!: string[];
}

class Marker {
	@prop({ type: String, lowercase: true })
	name!: string;

	@prop({ type: mongoose.Schema.Types.Map })
	filters!: Filters;
}

@index({ email: 1 }, { unique: true })
class Markers {
	@prop({ type: String, lowercase: true, required: true })
	email!: string;

	@prop({ type: mongoose.Schema.Types.Array })
	markers!: Marker[];
}
export const ModelMarkers = getModelForClass(Markers);
