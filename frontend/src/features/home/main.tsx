"use client";
import { Store } from "@/context/store";
import Image from "next/image";
import { useSelector } from "react-redux";
import { MainStyled } from "./styles/main-styled";

export const Main = () => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((collection) => collection.id === activeCollection) || allGames;

	return (
		<MainStyled>
			{collection.games.map((game) => (
				<div key={game.id} className="game">
					<Image className="cover" alt="Game image" src={game.background_image} width={1920} height={1080} />
					<h1 className="name">{game.name}</h1>
				</div>
			))}
		</MainStyled>
	);
};
