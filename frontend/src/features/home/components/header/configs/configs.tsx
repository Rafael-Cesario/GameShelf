import { Store } from "@/context/store";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ConfigsStyled } from "./styles/configs-styled";
import { useMutation } from "@apollo/client";
import { collectionQueries } from "@/services/queries/collection";
import { UpdateCollectionInput, UpdateCollectionResponse } from "@/services/interfaces/collection";
import { serviceErrors } from "@/services/interfaces/errors";
import { setCollectionUpdate } from "@/features/home/context/collection-slice";
import { setErrorNotification, setSuccessNotification } from "@/context/notification-slice";

export const Configs = () => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const [collection, setCollection] = useState(allGames);
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(collection.name);
	const [error, setError] = useState("");
	const [updateCollectionMutation] = useMutation<UpdateCollectionResponse, UpdateCollectionInput>(collectionQueries.UPDATE_COLLECTION);
	const dispatch = useDispatch();

	useEffect(() => {
		const collection = collections.find((c) => c.id === activeCollection) || allGames;
		setCollection(collection);
		setName(collection.name);
	}, [activeCollection]);

	// todo > Tests
	const saveCollection = async () => {
		if (collection.id === "0") return setError("Esta coleção não pode ser modificada.");

		try {
			const { data } = await updateCollectionMutation({ variables: { updateCollectionData: { id: collection.id, name } } });
			if (!data) throw new Error("No data returned from the server");

			dispatch(setCollectionUpdate(data.updateCollection));
			dispatch(setSuccessNotification({ message: "Sua coleção foi salva com sucesso." }));
			setIsOpen(false);
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.collection[errorCode as keyof typeof serviceErrors.collection] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
	};

	return (
		<>
			<button data-cy="open-configs" onClick={() => setIsOpen(true)} className="menu">
				Configurações
			</button>

			{isOpen && (
				<ConfigsStyled>
					<h1 className="title" data-cy="configs-title">
						Configurações
					</h1>

					<button className="close" onClick={() => setIsOpen(false)}>
						x
					</button>
					<div className="field">
						<label className="collection-name" htmlFor="collection-name">
							Nome
						</label>
						<input type="text" placeholder={collection.name} value={name} onChange={(e) => setName(e.target.value)} id="collection-name" />
						<span className="error" data-cy="error">
							{error}
						</span>
						<button data-cy="save" onClick={() => saveCollection()} className="save">
							Salvar alterações
						</button>
					</div>
					<button className="delete">Excluir esta coleção</button>
				</ConfigsStyled>
			)}
		</>
	);
};
