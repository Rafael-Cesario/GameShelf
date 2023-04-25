import type { IGameDetails } from '../../gamesContainer';
import { Dispatch, SetStateAction, useCallback } from 'react';
import { Container } from './container';
import { useGame } from './hooks/useGame';
import { useShortcuts } from '../../hooks/useShortcuts';

interface Props {
	props: {
		gameDetails: IGameDetails;
		setGameDetails: Dispatch<SetStateAction<IGameDetails>>;
	};
}

export const EditGame = ({ props: { gameDetails, setGameDetails } }: Props) => {
	const { name, release, rate, cover, genre, tags } = useGame(gameDetails.gameIndex);

	const closeEdit = () => setGameDetails({ gameIndex: 0, isOpen: '' });

	useShortcuts(
		useCallback((e: KeyboardEvent) => {
			e.key === 'Escape' && closeEdit();
		}, [])
	);

	return (
		<Container>
			<button onClick={() => closeEdit()} className="close">
				x
			</button>
		</Container>
	);
};
