"use client";
import { useSelector } from "react-redux";
import { HeaderStyled } from "./styles/header-styled";
import { Store } from "@/context/store";
import { AddGame } from "./components/header/add-game";

export const Header = () => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((collection) => collection.id === activeCollection) || allGames;

	return (
		<HeaderStyled>
			<div className="current-collection">
				<h1 className="name">{collection.name}</h1>
				<span className="games">{collection.games.length} Jogos</span>
			</div>

			<div className="menu-container">
				<input type="text" placeholder="Procurar" className="search-games" />
				<button className="menu">Filtros</button>
				<button className="menu">Ordem</button>
				<button className="menu">Configurações</button>
				<button className="menu add-game">Adicionar</button>
			</div>

			<AddGame />
		</HeaderStyled>
	);
};
