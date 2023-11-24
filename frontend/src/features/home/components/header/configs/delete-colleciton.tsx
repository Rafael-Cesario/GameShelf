"use client";
import { useState } from "react";

export const DeleteCollection = () => {
	const [deleteButton, setDeleteButton] = useState(false);

	const deleteCollection = async () => {};

	if (!deleteButton)
		return (
			<button onClick={() => setDeleteButton(true)} className="delete">
				Excluir esta coleção
			</button>
		);

	return (
		<div className="check-delete">
			<button className="delete">Clique novamente para confirmar que você realmente quer excluir esta coleção.</button>
			<button onClick={() => setDeleteButton(false)} className="cancel">
				Não quero excluir esta coleção
			</button>
		</div>
	);
};
