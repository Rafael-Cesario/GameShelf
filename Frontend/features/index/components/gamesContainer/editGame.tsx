import { Dispatch, SetStateAction } from 'react';
import { Container } from './container';
import { useGame } from './hooks/useGame';

type EditGameType = {
	isOpen: boolean;
	gameIndex: number;
};

interface Props {
	props: {
		editGame: EditGameType;
		setEditGame: Dispatch<SetStateAction<EditGameType>>;
	};
}

export const EditGame = ({ props: { editGame, setEditGame } }: Props) => {
	const { name, release, rate, cover, genre, tags } = useGame(editGame.gameIndex);

	return (
		<Container>
			<h1>Teste</h1>
		</Container>
	);
};
