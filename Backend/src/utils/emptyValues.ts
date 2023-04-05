export const checkValues = (values: object) => {
	const capitalize = (txt: string) => {
		return txt[0].toUpperCase() + txt.slice(1);
	};

	const empties: string[] = [];
	const entries = Object.entries(values);

	entries.forEach(([key, value]) => {
		key = capitalize(key);
		value || empties.push(`${key} was not provided`);
	});

	return empties.join(', ');
};
