"use client";
import { useState } from "react";
import { CreateCollectionStyled } from "./styles/create-collection-styled";

export const CreateCollection = () => {
	const [isOpen, setIsOpen] = useState(false);

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

							<input id="collection-name" type="text" placeholder="Digite um nome para sua coleção" />
						</div>
						<button className="submit">Criar</button>
					</div>
				</CreateCollectionStyled>
			)}
		</>
	);
};
