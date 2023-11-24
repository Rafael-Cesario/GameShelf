"use client";
import { setErrorNotification } from "@/context/notification-slice";
import { Store } from "@/context/store";
import { setActiveCollection, setCollectionDelete } from "@/features/home/context/collection-slice";
import { DeleteCollectionInput, DeleteCollectionResponse } from "@/services/interfaces/collection";
import { serviceErrors } from "@/services/interfaces/errors";
import { collectionQueries } from "@/services/queries/collection";
import { useMutation } from "@apollo/client";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

interface Props {
	setIsOpen(state: boolean): void;
}

export const DeleteCollection = ({ setIsOpen }: Props) => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((c) => c.id === activeCollection) || allGames;
	const [deleteButton, setDeleteButton] = useState(false);
	const [error, setError] = useState("");

	// todo > Loading
	const [deleteCollectionMutation] = useMutation<DeleteCollectionResponse, DeleteCollectionInput>(collectionQueries.DELETE_COLLECTION);
	const dispatch = useDispatch();

	const deleteCollection = async () => {
		if (collection.id === "0") return setError("Esta coleção não pode ser excluida");

		try {
			await deleteCollectionMutation({ variables: { collectionID: collection.id } });
			dispatch(setCollectionDelete({ collectionID: collection.id }));
			dispatch(setActiveCollection("0"));
			setIsOpen(false);
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.collection[errorCode as keyof typeof serviceErrors.collection] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
	};

	if (!deleteButton) {
		return (
			<button data-cy="delete-button" onClick={() => setDeleteButton(true)} className="delete">
				Excluir esta coleção
			</button>
		);
	}

	return (
		<div className="check-delete">
			<p className="error">{error}</p>
			<button data-cy="check-delete" onClick={() => deleteCollection()} className="delete">
				Clique novamente para confirmar que você realmente quer excluir esta coleção.
			</button>
			<button onClick={() => setDeleteButton(false)} className="cancel">
				Não quero excluir esta coleção
			</button>
		</div>
	);
};
