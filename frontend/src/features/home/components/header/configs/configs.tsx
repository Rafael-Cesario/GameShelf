import { Store } from "@/context/store";
import { useState } from "react";
import { useSelector } from "react-redux";
import { ConfigsStyled } from "./styles/configs-styled";

export const Configs = () => {
	const { collections, activeCollection, allGames } = useSelector((state: Store) => state.collection);
	const collection = collections.find((c) => c.id === activeCollection) || allGames;

	const [isOpen, setIsOpen] = useState(false);
	const [name, setName] = useState(collection.name);
	const [error, setError] = useState("");

	return (
		<>
			<button onClick={() => setIsOpen(true)} className="menu">
				Configurações
			</button>

			{isOpen && (
				<ConfigsStyled>
					<h1 className="title">Configurações</h1>
					<button className="close" onClick={() => setIsOpen(false)}>
						x
					</button>
					<div className="field">
						<label className="collection-name" htmlFor="collection-name">
							Nome
						</label>
						<input type="text" placeholder={collection.name} value={name} onChange={(e) => setName(e.target.value)} id="collection-name" />
						<span className="error">{error}</span>
						<button className="save">Salvar alterações</button>
					</div>
					<button className="delete">Excluir esta coleção</button>
				</ConfigsStyled>
			)}
		</>
	);
};
