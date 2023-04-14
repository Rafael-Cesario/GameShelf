import { index, prop, getModelForClass, PropType } from '@typegoose/typegoose';

@index({ email: 1 }, { unique: true })
class Markers {
	@prop({ type: String, lowercase: true, required: true })
	email!: string;

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	markers!: string[];

	@prop({ type: String, lowercase: true }, PropType.MAP)
	filters!: Filter;
}

class Filter {
	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	tags!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	genre!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	rate!: string[];
}

export const ModelMarkers = getModelForClass(Markers);
