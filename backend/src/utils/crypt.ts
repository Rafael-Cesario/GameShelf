import { genSaltSync, hashSync } from "bcrypt";

export const encryptPassword = (password: string) => {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);
	console.log({ password, hash });
	return hash;
};
