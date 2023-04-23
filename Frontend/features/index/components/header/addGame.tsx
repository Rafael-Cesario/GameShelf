import { useState } from 'react';
import { StyledAddGame } from '../../styles/styledAddGame';
import { Title } from './addGame/title';
import { ImageContainer } from './addGame/imageContainer';
import { FilterContainer } from './addGame/filterContainer';
import { RateContainer } from './addGame/rateContainer';
import { Field } from './addGame/field';
import { IGame } from '@/interfaces/IGames';
import { useGames } from '../../hooks/useGames';
import { StorageUser, storageKeys } from '@/interfaces/interfaceStorageKeys';
import { useNotification } from '@/utils/useNotification';
import { useDispatch, useSelector } from 'react-redux';
import { sliceGames } from '../../slices/games';
import { Store } from '@/context/store';

const defaultGameValues: IGame = {
	name: '',
	release: '',
	cover: '',
	rate: '',
	genre: [],
	tags: [],
};

export const AddGame = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [gameValues, setGameValues] = useState(defaultGameValues);
	const [error, setError] = useState('');
	const { games } = useSelector((state: Store) => state.games);
	const { requestAddGame } = useGames();
	const { sendNotification } = useNotification();
	const dispatch = useDispatch();

	const addGame = async () => {
		if (!gameValues.name) return setError('Seu jogo precisa de um nome.');

		const newGameName = new RegExp(gameValues.name, 'i');
		const alreadyHasGame = games.find((game) => game.name.match(newGameName));
		if (alreadyHasGame) return setError('Um jogo com o mesmo nome já foi adicionado.');

		setError('');

		const storage = localStorage.getItem(storageKeys.user);
		const { email } = JSON.parse(storage || '') as StorageUser;

		const { data, error } = await requestAddGame({
			addGame: {
				email,
				game: gameValues,
			},
		});

		if (error || !data) return sendNotification('Erro', 'Um erro ocorreu adicionando seu jogo');
		sendNotification('Sucesso', 'Seu jogo foi adicionado');

		setGameValues(defaultGameValues);
		dispatch(sliceGames.actions.setGames({ games: data }));
	};

	return (
		<StyledAddGame>
			<button onClick={() => setIsOpen(true)} role="open-add-game">
				Adicionar novo jogo
			</button>

			{isOpen && (
				<div className="add-game-container">
					<div className="build-game">
						<Title setIsOpen={setIsOpen} />

						<div className="inputs">
							<div className="data">
								<span className="error" role="error-message">
									{error}
								</span>

								<Field props={{ fieldName: 'name', placeholder: 'Nome', gameValues, setGameValues }} />
								<Field props={{ fieldName: 'release', placeholder: 'Data de lançamento', gameValues, setGameValues }} />
								<Field props={{ fieldName: 'cover', placeholder: 'Link para uma imagem', gameValues, setGameValues }} />

								<FilterContainer props={{ title: 'Tags', filterName: 'tags', gameValues, setGameValues }} />
								<FilterContainer props={{ title: 'Gêneros', filterName: 'genre', gameValues, setGameValues }} />
								<RateContainer props={{ gameValues, setGameValues }} />
							</div>

							<ImageContainer props={{ imageLink: gameValues.cover, gameName: gameValues.name }} />
						</div>

						<button role="add-game-button" onClick={() => addGame()} className="add-game-button">
							Criar
						</button>
					</div>
				</div>
			)}
		</StyledAddGame>
	);
};
