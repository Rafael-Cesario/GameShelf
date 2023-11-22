"use client";

import { useSelector } from "react-redux";
import { CollectionContainerStyled } from "./styles/collection-container-styled";
import { Store } from "@/context/store";

// [ Todo ]
// Collection on click active collection

export const CollectionContainer = () => {
	const { collections, activeCollection } = useSelector((state: Store) => state.collection);

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
