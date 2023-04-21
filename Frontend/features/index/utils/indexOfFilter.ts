export const indexOfFilter = (filters: string[], filter: string) => {
	const hasFilter = filters.findIndex((draftFilter) => draftFilter.toLowerCase() === filter.toLowerCase());
	return hasFilter;
};
