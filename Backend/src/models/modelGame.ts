import { index, prop } from '@typegoose/typegoose';

@index({ name: 1 }, { unique: true })
export class Game {
	@prop({ type: String, lowercase: true })
	name!: string;

	@prop({ type: String, lowercase: true })
	genre!: string;

	@prop({ type: String, lowercase: true })
	rate!: string;

	@prop({ type: String, lowercase: true })
	release!: string;

	@prop({ type: String, lowercase: true })
	category!: string[];

	@prop({ type: String, lowercase: true })
	tags!: string[];
}
