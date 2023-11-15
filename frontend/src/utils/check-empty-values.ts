export const checkEmptyValues = (values: object) => {
	const emptyValues: { [key: string]: string } = {};
	const entries = Object.entries(values);

	let hasEmptyValues = false;

	entries.forEach(([key, value]) => {
		if (!value) {
			emptyValues[key] = "Este campo não pode ficar vazio";
			hasEmptyValues = true;
		}
	});

	return { hasEmptyValues, emptyValues };
};
