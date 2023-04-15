import { PropType, prop } from '@typegoose/typegoose';

export class Filters {
	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	tags!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	genre!: string[];

	@prop({ type: String, lowercase: true }, PropType.ARRAY)
	rate!: string[];
}
