"use client";

import { useState } from "react";
import Image from "next/image";
import { GamesContainerStyled } from "./styles/games-container-styled";
import { SearchGameStyled } from "./styles/search-game-styled";
import { GameModel } from "@/services/interfaces/game";

interface Props {
	setCurrentGame(game: GameModel): void;
	setOpenAddGame(state: boolean): void;
}

const getDate = (game: GameModel) => {
	const [year, month, day] = game.released.split("-");
	const date = new Date(Number(year), Number(month) - 1, Number(day)).getTime();
	return date;
};

export const formatDate = (date: string) => {
	const [year, month, day] = date.split("-");
	return `${day}/${month}/${year}`;
};

export const SearchGame = ({ setCurrentGame, setOpenAddGame }: Props) => {
	const [gameName, setGameName] = useState("");
	const [games, setGames] = useState<GameModel[]>([]);

	const searchGame = async (e: React.FormEvent) => {
		e.preventDefault();

		const url = process.env.NEXT_PUBLIC_API_URL + "?key=" + process.env.NEXT_PUBLIC_API_KEY;
		const search = `&search=${gameName}`;
		const pageSize = `&page_size=20`;
		const { results } = (await fetch(`${url}${search}${pageSize}`).then((data) => data.json())) as { results: GameModel[] };

		const games = results
			.filter((game) => game.name.match(new RegExp(gameName, "i")))
			.filter((game) => game.rating !== 0)
			.sort((a, b) => getDate(b) - getDate(a));

		setGames(games);
	};

	return (
		<>
			<SearchGameStyled data-cy="search-game">
				<h1 className="title">Adicionar jogo</h1>

				<form onSubmit={(e) => searchGame(e)} className="add-game">
					<input data-cy="search-game-input" onChange={(e) => setGameName(e.target.value)} type="text" placeholder="Busque pelo nome de um jogo" />
					<button className="search" data-cy="search-game-button">Buscar</button>
				</form>

				<button className="close" onClick={() => setOpenAddGame(false)}>
					x
				</button>
			</SearchGameStyled>

			<GamesContainerStyled>
				{games.map((game) => (
					<div onClick={() => setCurrentGame(game)} key={game.id} className="game">
						<Image className="cover" width={1080} height={1920} alt="game image" src={game.background_image} />
						<div className="info">
							<h1 className="title">{game.name}</h1>
							<span className="date">{formatDate(game.released)}</span>
						</div>
					</div>
				))}
			</GamesContainerStyled>
		</>
	);
};
