"use client";
import Image from "next/image";
import { IGame } from "./add-game";
import { useSelector } from "react-redux";
import { Store } from "@/context/store";
import { CurrentGameStyled } from "./styles/current-game-styled";
import { formatDate } from "./search-game";
import { useState } from "react";
import { CollectionModel } from "@/services/interfaces/collection";
import { produce } from "immer";

interface Props {
	game: IGame;
}

export const CurrentGame = ({ game }: Props) => {
	const { collections } = useSelector((state: Store) => state.collection);
	const [gameData, setGameData] = useState<IGame>(game);

	const toggleCollection = (collection: CollectionModel) => {
		const state = produce(gameData, (draft) => {
			if (!draft.collections) draft.collections = [];

			const collectionIndex = gameData.collections.indexOf(collection);

			if (collectionIndex > -1) {
				draft.collections.splice(collectionIndex, 1);
				return;
			}

			draft.collections.push(collection);
		});

		setGameData(state);
	};

	const generateClass = (c: CollectionModel) => {
		let name = "collection";

		if (!gameData.collections) return name;

		const hasCollection = gameData.collections.includes(c);
		if (hasCollection) name += " active";

		return name;
	};

	return (
		<CurrentGameStyled>
			<button className="close">x</button>

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
							<button onClick={() => toggleCollection(c)} className={generateClass(c)} key={c.id}>
								{c.name}
							</button>
						))}
					</div>
				</div>

				<button className="save-game">Salvar</button>
			</div>
		</CurrentGameStyled>
	);
};
