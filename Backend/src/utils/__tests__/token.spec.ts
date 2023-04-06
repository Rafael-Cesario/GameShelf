import { describe, it, expect } from 'vitest';
import { generateToken, verifyToken } from '../token';

describe('Token', () => {
	it('Generate a new token', () => {
		const email = 'user@email.com';
		const token = generateToken(email);
		expect(token).toBeDefined();

		const decoded = verifyToken(token) as any;
		expect(decoded.email).toBe(email);

		const expiresIn = new Date(decoded.exp * 1000).getDate();
		expect(expiresIn).toBe(new Date().getDate() + 7);
	});

	it('has a valid token', () => {
		const email = 'user@email.com';
		const token = generateToken(email);
		const decoded = verifyToken(token) as any;
		expect(decoded).toBeDefined();
	});

	it('has a invalid token', () => {
		const email = 'user@email.com';
		const token = generateToken(email);
		const decoded = verifyToken(token + 'QwE') as any;
		expect(decoded).toBe(false);
	});
});
