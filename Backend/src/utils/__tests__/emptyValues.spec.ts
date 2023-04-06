import { describe, test, expect } from 'vitest';
import { searchForEmptyValues } from '../emptyValues';

describe(`EmptyValues`, () => {
	test('Email and password is empty', () => {
		const emptyValues = searchForEmptyValues({ email: '', password: '' });
		expect(emptyValues).toBe('Email was not provided, Password was not provided');
	});

	test('Email is empty', () => {
		const emptyValues = searchForEmptyValues({ email: '', password: '123123' });
		expect(emptyValues).toBe('Email was not provided');
	});

	test('No empty values', () => {
		const emptyValues = searchForEmptyValues({ email: 'qweqwe', password: '123123' });
		expect(emptyValues).toBe('');
	});
});
