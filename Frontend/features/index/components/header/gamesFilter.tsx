import { useState } from 'react';
import { Container } from '../container';
import { StyledGamesFilter } from './styles/styledGamesFilter';
import { Filter } from './gamesFilter/filter';
import { IFilters } from '../../interfaces/iFilters';

export const GamesFilter = () => {
	const [isOpen, setIsOpen] = useState(false);

	const [filters, setFilters] = useState<IFilters>({
		tags: [],
		genre: [],
		rate: '',
	});

	return (
		<>
			<button onClick={() => setIsOpen(true)}>Filtros</button>

			{isOpen && (
				<Container>
					<StyledGamesFilter>
						<div className="title">
							<h1>Filtros</h1>
							<button className="close" onClick={() => setIsOpen(false)}>
								x
							</button>
						</div>

						<Filter props={{ title: 'Tags', key: 'tags', filters, setFilters }} />
					</StyledGamesFilter>
				</Container>
			)}
		</>
	);
};
