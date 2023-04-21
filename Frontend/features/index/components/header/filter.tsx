interface FilterProps {
	props: {
		filterName: string;
		filters: string[];
		placeholder: string;
	};
}

export const Filter = ({ props: { filterName, filters, placeholder } }: FilterProps) => {
	return (
		<div className={filterName}>
			<input type="text" className="filter" placeholder={placeholder} />

			{filters.map((filter) => (
				<button className={filterName.slice(0, filterName.length - 1)} key={filter}>
					{filter}
				</button>
			))}
		</div>
	);
};
