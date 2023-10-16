import { genSaltSync, hashSync, compareSync } from "bcrypt";

export const encryptPassword = (password: string) => {
	const salt = genSaltSync(10);
	const hash = hashSync(password, salt);
	return hash;
};

export const comparePasswords = (password: string, hash: string) => {
	const samePassword = compareSync(password, hash);
	return samePassword;
};
