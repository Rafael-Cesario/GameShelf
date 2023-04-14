import { Game } from './modelGame';
import { prop, getModelForClass } from '@typegoose/typegoose';

class Games {
	@prop({ type: String, required: true, lowercase: true })
	user!: string;

	@prop()
	games!: Game[];
}

export const ModelGames = getModelForClass(Games);
