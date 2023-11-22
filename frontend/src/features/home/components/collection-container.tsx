"use client";

import { useDispatch, useSelector } from "react-redux";
import { CollectionContainerStyled } from "./styles/collection-container-styled";
import { Store } from "@/context/store";
import { useQuery } from "@apollo/client";
import { collectionQueries } from "@/services/queries/collection";
import { GetCollectionsInput, GetCollectionsResponse } from "@/services/interfaces/collection";
import { useEffect } from "react";
import { setActiveCollection, setCollections } from "../context/collection-slice";
import { gameQueries } from "@/services/queries/game";
import { GetGameResponse, GetGamesInput } from "@/services/interfaces/game";

// [ Todo ]
// Get all games

interface Props {
	userID: string;
}

export const CollectionContainer = ({ userID }: Props) => {
	const { data: getCollectionsData } = useQuery<GetCollectionsResponse, GetCollectionsInput>(collectionQueries.GET_COLLECTIONS, { variables: { userID } });
	const { data: getGamesData } = useQuery<GetGameResponse, GetGamesInput>(gameQueries.GET_GAMES, { variables: { userID } });
	const { collections, activeCollection } = useSelector((state: Store) => state.collection);
	const allGames = getGamesData?.getGames || [];

	const dispatch = useDispatch();

	useEffect(() => {
		if (getCollectionsData) dispatch(setCollections({ collections: getCollectionsData.getCollections }));
	}, [getCollectionsData]);

	return (
		<CollectionContainerStyled>
			<div className="collection">
				<button onClick={() => dispatch(setActiveCollection("0"))} className={activeCollection === "0" ? "active" : ""}>
					Todos
				</button>
				<span className="amount">{allGames?.length}</span>
			</div>

			{collections.map((collection) => (
				<div className="collection" key={collection.id}>
					<button onClick={() => dispatch(setActiveCollection(collection.id))} className={activeCollection === collection.id ? "active" : ""}>
						{collection.name}
					</button>
					<span className="amount">{collection.games.length}</span>
				</div>
			))}
		</CollectionContainerStyled>
	);
};
