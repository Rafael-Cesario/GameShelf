import { Store } from "@/context/store";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ConfigsStyled } from "./styles/configs-styled";
import { useMutation } from "@apollo/client";
import { collectionQueries } from "@/services/queries/collection";
import { UpdateCollectionInput, UpdateCollectionResponse } from "@/services/interfaces/collection";
import { serviceErrors } from "@/services/interfaces/errors";

export const Configs = () => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const [collection, setCollection] = useState(allGames);
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(collection.name);
	const [error, setError] = useState("");
	const [updateCollectionMutation, { loading }] = useMutation<UpdateCollectionResponse, UpdateCollectionInput>(collectionQueries.UPDATE_COLLECTION);

	useEffect(() => {
		const collection = collections.find((c) => c.id === activeCollection) || allGames;
		setCollection(collection);
		setName(collection.name);
	}, [activeCollection]);

	const saveCollection = async () => {
		if (collection.id === "0") return setError("Esta coleção não pode ser modificada.");

		try {
			const { data } = await updateCollectionMutation({ variables: { updateCollectionData: { id: collection.id, name } } });
			console.log({ data });
			console.log("hello");

			// dispatch setCollection
			// dispatch notification
			// close configs
			// Tests
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.collection[errorCode as keyof typeof serviceErrors.collection] || serviceErrors.default;
			console.log(error.message);
			// dispatch();
		}

		// Todo > Update collection mutation
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
