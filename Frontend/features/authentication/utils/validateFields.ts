import { CreateAccountFields, ICreateAccount } from "../interfaces/forms";
import { Validations } from "./validations";

export const validateFields = (fields: ICreateAccount) => {
	const validations = new Validations();
	const entries = Object.entries(fields);
	const errors: ICreateAccount = { email: '', name: '', password: '', confirmPassword: '' };
	let hasError = false;

	entries.forEach(([key, value]) => {
		const invalidField = validations[key as CreateAccountFields](value, fields.password);

		if (invalidField) {
			hasError = true;
			errors[key as CreateAccountFields] = invalidField;
		}
	});

	return { errors, hasError };
};
