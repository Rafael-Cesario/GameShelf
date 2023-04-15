import mongoose from 'mongoose';
import { Filters } from './modelFilters';
import { prop, getModelForClass, index } from '@typegoose/typegoose';

@index({ user: 1 }, { unique: true })
class Games {
	@prop({ type: String, required: true, lowercase: true })
	user!: string;

	@prop({ type: mongoose.Schema.Types.Array })
	games!: Game[];

	@prop({ type: mongoose.Schema.Types.Map })
	filters!: Filters;
}

@index({ name: 1 }, { unique: true })
class Game {
	@prop({ type: String, lowercase: true })
	name!: string;

	@prop({ type: String, lowercase: true })
	release!: string;

	@prop({ type: String, lowercase: true })
	category!: string[];

	@prop({ type: String, lowercase: true })
	tags!: string[];

	@prop({ type: String, lowercase: true })
	genre!: string;

	@prop({ type: String, lowercase: true })
	rate!: string;

	@prop({ type: String })
	cover!: string;
}

export const ModelGames = getModelForClass(Games);
