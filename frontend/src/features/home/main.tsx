"use client";
import { Store } from "@/context/store";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { MainStyled } from "./styles/main-styled";
import { setGameData } from "./context/games-slice";
import { GameData } from "./components/main/game-data";

export const Main = () => {
	const { search } = useSelector((state: Store) => state.games);
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((collection) => collection.id === activeCollection) || allGames;
	const dispatch = useDispatch();

	return (
		<MainStyled>
			{collection.games
				.filter((game) => game.name.match(new RegExp(search, "i")))
				.map((game) => (
					<div onClick={() => dispatch(setGameData(game))} data-cy="game" key={game.id} className="game">
						<Image className="cover" alt="Game image" src={game.background_image} width={1920} height={1080} />
						<h1 className="name">{game.name}</h1>
					</div>
				))}

			<GameData />
		</MainStyled>
	);
};
