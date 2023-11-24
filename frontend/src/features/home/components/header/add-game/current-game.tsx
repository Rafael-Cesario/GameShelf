"use client";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { Store } from "@/context/store";
import { CurrentGameStyled } from "./styles/current-game-styled";
import { formatDate } from "./search-game";
import { useState } from "react";
import { produce } from "immer";
import { AddGameInput, GameModel } from "@/services/interfaces/game";
import { getCookiesUser } from "@/utils/cookies";
import { useMutation } from "@apollo/client";
import { gameQueries } from "@/services/queries/game";
import { setErrorNotification, setSuccessNotification } from "@/context/notification-slice";
import { serviceErrors } from "@/services/interfaces/errors";
import { setCollectionGames } from "../../../context/collection-slice";

interface Props {
	game: GameModel;
	setOpenAddGame(state: boolean): void;
	setCurrentGame(state: GameModel | false): void;
}

export const CurrentGame = ({ game, setOpenAddGame, setCurrentGame }: Props) => {
	const { collections } = useSelector((state: Store) => state.collection);
	const [addGameMutation] = useMutation<any, AddGameInput>(gameQueries.ADD_GAME);
	const dispatch = useDispatch();

	const [gameData, setGameData] = useState<GameModel>({
		userID: "",
		id: game.id,
		name: game.name,
		rating: game.rating,
		released: game.released,
		background_image: game.background_image,
		collections: [],
	});

	const saveGame = async () => {
		const addGameToCollections = (userID: string) => {
			if (!gameData.collections.length) dispatch(setCollectionGames({ collectionID: "0", game: { ...gameData, userID } }));

			gameData.collections.forEach((c) => {
				dispatch(setCollectionGames({ collectionID: c.id, game: { ...gameData, userID } }));
			});
		};

		try {
			const { id } = await getCookiesUser();
			const { data } = await addGameMutation({ variables: { addGameData: { ...gameData, userID: id } } });
			console.log({ gameData, data });

			setOpenAddGame(false);
			addGameToCollections(id);
			dispatch(setSuccessNotification({ message: "Seu jogo foi salvo com sucesso." }));
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.game[errorCode as keyof typeof serviceErrors.game] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
	};

	// todo > Refactor
	const toggleCollection = (collectionID: string) => {
		const state = produce(gameData, (draft) => {
			const collectionIndex = draft.collections.findIndex((c) => c.id === collectionID);

			if (collectionIndex > -1) {
				draft.collections.splice(collectionIndex, 1);
				return;
			}

			draft.collections.push({ id: collectionID });
		});

		setGameData(state);
	};

	const generateClass = (c: { id: string }) => {
		let name = "collection";

		const collectionIndex = gameData.collections.findIndex((collection) => collection.id === c.id);
		if (collectionIndex > -1) name += " active";

		return name;
	};

	return (
		<CurrentGameStyled data-cy="current-game">
			<button className="back" onClick={() => setCurrentGame(false)}>
				Voltar
			</button>

			<button onClick={() => setOpenAddGame(false)} className="close">
				x
			</button>

			<Image className="cover" width={1080} height={1920} alt="game image" src={game.background_image} />

			<div className="container">
				<div className="info">
					<h1 className="title">{game.name}</h1>
					<span className="date">{formatDate(game.released)}</span>
				</div>

				<div className="collections">
					<h1 className="title">Minhas coleções</h1>
					<p className="description">Você pode escolher algumas de suas coleções para salvar este jogo.</p>

					<div className="collections-container">
						{collections.map((c) => (
							<button onClick={() => toggleCollection(c.id)} className={generateClass(c)} key={c.id}>
								{c.name}
							</button>
						))}
					</div>
				</div>

				<button onClick={() => saveGame()} className="save-game">
					Salvar
				</button>
			</div>
		</CurrentGameStyled>
	);
};
