"use client";
import { useState } from "react";
import { CreateCollectionStyled } from "./styles/create-collection-styled";
import { collectionQueries } from "@/services/queries/collection";
import { useMutation } from "@apollo/client";
import { CreateCollectionInput, CreateCollectionResponse } from "@/services/interfaces/collection";
import { getCookiesUser } from "@/utils/cookies";
import { useDispatch } from "react-redux";
import { setCreateCollection } from "../context/collection-slice";
import { setErrorNotification, setSuccessNotification } from "@/context/notification-slice";
import { serviceErrors } from "@/services/interfaces/errors";
import { LoadingButton } from "@/components/loading-button";

// [ Todo ]
// Display new collection on collections list

export const CreateCollection = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState("");
	const [error, setError] = useState("");

	const [createCollectionMutation, { loading }] = useMutation<CreateCollectionResponse, CreateCollectionInput>(collectionQueries.CREATE_COLLECTION);
	const dispatch = useDispatch();

	const createCollection = async () => {
		if (name.length < 3 || name.length > 20) return setError("O nome da sua coleção deve conter entre 3 a 20 caracteres.");

		try {
			const { id } = await getCookiesUser();
			const { data } = await createCollectionMutation({ variables: { createCollectionData: { name, userID: id } } });
			if (!data) throw new Error("No data received from the server");

			const collection = { ...data.createCollection, games: [] };
			dispatch(setCreateCollection({ collection }));

			dispatch(setSuccessNotification({ message: `Nova coleção criada: ${name}` }));
			setIsOpen(false);
			setName("");
		} catch (error: any) {
			const [errorCode] = error.message.toLowerCase().split(":");
			const message = serviceErrors.collection[errorCode as keyof typeof serviceErrors.collection] || serviceErrors.default;
			dispatch(setErrorNotification({ message }));
		}
	};

	return (
		<>
			<button className="create-collection" onClick={() => setIsOpen(true)}>
				Criar nova coleção
			</button>

			{isOpen && (
				<CreateCollectionStyled>
					<div className="container">
						<button className="close" onClick={() => setIsOpen(false)}>
							x
						</button>
						<h1 className="title">Criar coleção</h1>
						<div className="field">
							<label htmlFor="collection-name" className="field-title">
								Nome
							</label>
							<input value={name} onChange={(e) => setName(e.target.value)} id="collection-name" type="text" placeholder="Digite um nome para sua coleção" />
							<span className="error">{error}</span>
						</div>

						{!loading && (
							<button onClick={() => createCollection()} className="submit">
								Criar
							</button>
						)}

						{loading && <LoadingButton className="submit" />}
					</div>
				</CreateCollectionStyled>
			)}
		</>
	);
};
