"use client";

import { useDispatch, useSelector } from "react-redux";
import { CollectionContainerStyled } from "./styles/collection-container-styled";
import { Store } from "@/context/store";
import { useQuery } from "@apollo/client";
import { collectionQueries } from "@/services/queries/collection";
import { GetCollectionsInput, GetCollectionsResponse } from "@/services/interfaces/collection";
import { useEffect } from "react";
import { setCollections } from "../context/collection-slice";

// [ Todo ]
// Collection on click active collection

interface Props {
	userID: string;
}

export const CollectionContainer = ({ userID }: Props) => {
	const { data } = useQuery<GetCollectionsResponse, GetCollectionsInput>(collectionQueries.GET_COLLECTIONS, { variables: { userID } });
	const { collections, activeCollection } = useSelector((state: Store) => state.collection);

	const dispatch = useDispatch();

	useEffect(() => {
		if (data) dispatch(setCollections({ collections: data.getCollections }));
	}, [data]);

	return (
		<CollectionContainerStyled>
			{collections.map((collection) => (
				<div className="collection" key={collection.id}>
					<button className={activeCollection === collection.id ? "active" : ""}>{collection.name}</button>
					<span className="amount">{collection.games.length}</span>
				</div>
			))}
		</CollectionContainerStyled>
	);
};
