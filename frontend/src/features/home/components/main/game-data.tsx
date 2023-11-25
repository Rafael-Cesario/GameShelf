import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { GameDataStyled } from "./styles/game-data-styled";
import Image from "next/image";
import { setGameData } from "../../context/games-slice";
import { GameCollections } from "./game-collections";
import { useEffect, useState } from "react";

export interface ICollection {
	id: string;
	name: string;
}

export const GameData = () => {
	const { gameData } = useSelector((state: Store) => state.games);
	const [gameCollections, setGameCollections] = useState<ICollection[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (gameData) setGameCollections(gameData.collections);
	}, [gameData]);

	if (!gameData) return null;

	return (
		<GameDataStyled>
			<button onClick={() => dispatch(setGameData(null))} className="close">
				x
			</button>

			<Image className="cover" alt="game image" src={gameData.background_image} width={1920} height={1080} />

			<div className="info">
				<h1 className="name">{gameData.name}</h1>
				<p className="date">{gameData.released}</p>
			</div>

			<GameCollections props={{ gameCollections, setGameCollections }} />

			<div className="buttons">
				<button className="save">Salvar alterações</button>
				<button className="delete">Remover jogo</button>
			</div>
		</GameDataStyled>
	);
};
