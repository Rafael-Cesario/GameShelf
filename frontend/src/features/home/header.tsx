"use client";
import { useSelector } from "react-redux";
import { HeaderStyled } from "./styles/header-styled";
import { Store } from "@/context/store";
import { AddGame } from "./components/header/add-game/add-game";
import { useState } from "react";
import { Configs } from "./components/header/configs/configs";

export const Header = () => {
	const [openAddGame, setOpenAddGame] = useState(false);
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((collection) => collection.id === activeCollection) || allGames;

	return (
		<HeaderStyled>
			<div className="current-collection">
				<h1 className="name">{collection.name}</h1>
				<span className="games" data-cy="current-games-amount">
					{collection.games.length} Jogos
				</span>
			</div>

			<div className="menu-container">
				<input type="text" placeholder="Procurar" className="search-games" />
				<button className="menu">Filtros</button>
				<button className="menu">Ordem</button>
				<Configs />
				<button data-cy="open-add-game-container" className="menu add-game" onClick={() => setOpenAddGame(true)}>
					Adicionar
				</button>
			</div>

			{openAddGame && <AddGame setOpenAddGame={setOpenAddGame} />}
		</HeaderStyled>
	);
};
