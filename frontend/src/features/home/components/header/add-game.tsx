"use client";
import { useState } from "react";
import { AddGameStyled } from "./styles/add-game-styled";
import { SearchGame } from "./search-game";
import { CurrentGame } from "./current-game";
import { GameModel } from "@/services/interfaces/game";

interface Props {
	setOpenAddGame(state: boolean): void;
}

export const AddGame = ({ setOpenAddGame }: Props) => {
	const [currentGame, setCurrentGame] = useState<GameModel | false>(false);

	return (
		<AddGameStyled>
			{!currentGame && <SearchGame setOpenAddGame={setOpenAddGame} setCurrentGame={setCurrentGame} />}
			{currentGame && <CurrentGame setCurrentGame={setCurrentGame} game={currentGame} setOpenAddGame={setOpenAddGame} />}
		</AddGameStyled>
	);
};
