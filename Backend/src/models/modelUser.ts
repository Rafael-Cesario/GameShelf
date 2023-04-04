import { index, prop, getModelForClass } from '@typegoose/typegoose';

@index({ email: 1 }, { unique: true })
class User {
	@prop({ type: String, required: true, lowercase: true })
	email!: string;

	@prop({ type: String, required: true })
	password!: string;
}

export const ModelUser = getModelForClass(User);
