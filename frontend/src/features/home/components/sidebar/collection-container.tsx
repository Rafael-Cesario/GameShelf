"use client";
import { useDispatch, useSelector } from "react-redux";
import { CollectionContainerStyled } from "./../sidebar/styles/collection-container-styled";
import { Store } from "@/context/store";
import { useQuery } from "@apollo/client";
import { collectionQueries } from "@/services/queries/collection";
import { GetCollectionsInput, GetCollectionsResponse } from "@/services/interfaces/collection";
import { useEffect } from "react";
import { setActiveCollection, setAllGames, setCollections } from "../../context/collection-slice";
import { gameQueries } from "@/services/queries/game";
import { GetGameResponse, GetGamesInput } from "@/services/interfaces/game";

interface Props {
	userID: string;
}

export const CollectionContainer = ({ userID }: Props) => {
	const { data: getCollectionsData } = useQuery<GetCollectionsResponse, GetCollectionsInput>(collectionQueries.GET_COLLECTIONS, { variables: { userID } });
	const { data: getGamesData } = useQuery<GetGameResponse, GetGamesInput>(gameQueries.GET_GAMES, { variables: { userID } });
	const { collections, activeCollection, search, allGames } = useSelector((state: Store) => state.collection);
	const dispatch = useDispatch();

	useEffect(() => {
		if (getCollectionsData) dispatch(setCollections({ collections: getCollectionsData.getCollections }));
		if (getGamesData) dispatch(setAllGames({ userID, games: getGamesData.getGames }));
	}, [getCollectionsData, getGamesData]);

	return (
		<CollectionContainerStyled data-cy="collection-container">
			<div className="collection">
				<button onClick={() => dispatch(setActiveCollection("0"))} className={activeCollection === "0" ? "active" : ""}>
					Todos
				</button>
				<span className="amount">{allGames.games.length}</span>
			</div>

			{collections
				.filter((collection) => collection.name.match(new RegExp(search, "i")))
				.map((collection) => (
					<div data-cy={"collection " + collection.id} className="collection" key={collection.id}>
						<button onClick={() => dispatch(setActiveCollection(collection.id))} className={activeCollection === collection.id ? "active" : ""}>
							{collection.name}
						</button>
						<span className="amount">{collection.games.length}</span>
					</div>
				))}
		</CollectionContainerStyled>
	);
};
