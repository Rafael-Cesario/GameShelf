import bcrypt from 'bcrypt';

export const encryptPassword = (password: string) => {
	const rounds = 10;
	const salt = bcrypt.genSaltSync(rounds);
	const hash = bcrypt.hashSync(password, salt);
	return hash;
};

export const checkPassword = (password: string, hashedPassword: string) => {
	return bcrypt.compareSync(password, hashedPassword);
};
