import { index, prop, getModelForClass, pre } from '@typegoose/typegoose';
import { encryptPassword } from '../utils/crypt';

@pre<User>('save', function () {
	this.password = encryptPassword(this.password);
})
@index({ email: 1 }, { unique: true })
class User {
	@prop({ type: String, required: true, lowercase: true })
	email!: string;

	@prop({ type: String, required: true })
	password!: string;
}

export const ModelUser = getModelForClass(User);
