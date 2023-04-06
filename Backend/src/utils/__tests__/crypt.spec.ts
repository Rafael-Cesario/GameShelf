import { describe, test, expect } from 'vitest';
import { checkPassword, encryptPassword } from '../crypt';

describe(`Crypt`, () => {
	test('EncryptPassword', () => {
		const password = '123123';
		const hash = encryptPassword(password);
		expect(hash).not.toBe(password);
	});

	test(`Check password`, () => {
		const password = '123123';
		const hash = encryptPassword(password);

		let isSamePassword = checkPassword(password, hash);
		expect(isSamePassword).toBe(true);

		isSamePassword = checkPassword('wrongPassword', hash);
		expect(isSamePassword).toBe(false);
	});
});
