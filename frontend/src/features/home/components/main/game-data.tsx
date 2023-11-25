import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { GameDataStyled } from "./styles/game-data-styled";
import Image from "next/image";
import { setGameData } from "../../context/games-slice";

export const GameData = () => {
	const { gameData } = useSelector((state: Store) => state.games);
	const dispatch = useDispatch();

	if (!gameData) return null;

	return (
		<GameDataStyled>
			<button onClick={() => dispatch(setGameData(null))} className="close">x</button>

			<Image className="cover" alt="game image" src={gameData.background_image} width={1920} height={1080} />

			<div className="info">
				<h1 className="name">{gameData.name}</h1>
				<p className="date">{gameData.released}</p>
			</div>

			<div className="collection-container">
				{gameData.collections.map((collection) => (
					<div className="collection" key={collection.id}>
						{collection.name}
					</div>
				))}
			</div>

			<div className="buttons">
				<button className="save">Salvar alterações</button>
				<button className="delete">Remover jogo</button>
			</div>
		</GameDataStyled>
	);
};
