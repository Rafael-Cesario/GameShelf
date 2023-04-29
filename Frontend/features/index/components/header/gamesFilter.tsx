import { useCallback, useState } from 'react';
import { Container } from '../container';
import { StyledGamesFilter } from './styles/styledGamesFilter';
import { Filter } from './gamesFilter/filter';
import { Rate } from './gamesFilter/rate';
import { useShortcuts } from '../../hooks/useShortcuts';

export const GamesFilter = () => {
	const [isOpen, setIsOpen] = useState(false);

	const closeShortcut = useCallback((e: KeyboardEvent) => {
		e.key === 'Escape' && setIsOpen(false);
	}, []);

	useShortcuts(closeShortcut);

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

						<Filter props={{ title: 'Tags', key: 'tags' }} />
						<Filter props={{ title: 'Gênero', key: 'genre' }} />
						<Rate />
					</StyledGamesFilter>
				</Container>
			)}
		</>
	);
};
