"use client";
import { useState } from "react";
import { AddGameStyled } from "./styles/add-game-styled";
import { SearchGame } from "./search-game";
import { CurrentGame } from "./current-game";

export interface IGame {
	id: number;
	name: string;
	background_image: string;
	rating: number;
	released: string;
}

export const AddGame = () => {
	const [currentGame, setCurrentGame] = useState<IGame | false>(false);

	return (
		<AddGameStyled>
			{!currentGame && <SearchGame setCurrentGame={setCurrentGame} />}
			{currentGame && <CurrentGame game={currentGame} />}
		</AddGameStyled>
	);
};
