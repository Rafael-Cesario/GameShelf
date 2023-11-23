"use client";
import { useState } from "react";
import { AddGameStyled } from "./styles/add-game-styled";
import { SearchGame } from "./search-game";
import { CurrentGame } from "./current-game";
import { GameModel } from "@/services/interfaces/game";

export const AddGame = () => {
	const [currentGame, setCurrentGame] = useState<GameModel | false>(false);

	return (
		<AddGameStyled>
			{!currentGame && <SearchGame setCurrentGame={setCurrentGame} />}
			{currentGame && <CurrentGame game={currentGame} />}
		</AddGameStyled>
	);
};
