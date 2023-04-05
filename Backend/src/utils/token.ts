import 'dotenv/config';
import jwt from 'jsonwebtoken';

export const generateToken = (email: string) => {
	const secret = process.env.SECRET;
	if (!secret) throw new Error('Secret Not found');

	const expiresIn = 1 * 60 * 60 * 24 * 7;
	const token = jwt.sign({ email }, process.env.SECRET!, { expiresIn });

	return token;
};

export const verifyToken = (token: string) => {
	const secret = process.env.SECRET;
	if (!secret) throw new Error('Secret not found');

	try {
		const decoded = jwt.verify(token, secret);
		return decoded as { email: string; iat: number; exp: number };
	} catch (error: any) {
		return false;
	}
};
