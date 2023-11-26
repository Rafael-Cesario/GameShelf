import { useSelector } from "react-redux";
import { ICollection } from "./game-data";
import { GameCollectionsStyled } from "./styles/game-collections-styled";
import { Store } from "@/context/store";
import { produce } from "immer";

interface Props {
	props: {
		gameCollections: ICollection[];
		setGameCollections(state: ICollection[]): void;
	};
}

export const GameCollections = ({ props: { gameCollections, setGameCollections } }: Props) => {
	const { collections: userCollections } = useSelector((state: Store) => state.collection);

	// Todo > Test
	const generateClass = (id: string) => {
		const hasCollection = gameCollections.find((c) => c.id == id) ? "active" : "";
		const className = `collection ${hasCollection}`;
		return className;
	};

	// Todo > Test
	const toggleCollection = (collection: ICollection) => {
		const collectionIndex = gameCollections.findIndex((c) => c.id === collection.id);
		const hasCollection = collectionIndex > -1;

		const state = produce(gameCollections, (draft) => {
			if (hasCollection) draft.splice(collectionIndex, 1);
			else draft.push({ id: collection.id });
		});

		setGameCollections(state);
	};

	return (
		<GameCollectionsStyled>
			<h1 className="title">Minhas coleções</h1>
			<p className="description">Você pode escolher algumas de suas coleções para salvar este jogo.</p>

			{!userCollections.length && <p className="empty">Parece que você ainda não tem nenhuma coleção.</p>}

			<div className="collections-container">
				{userCollections.map((collection) => {
					return (
						<div onClick={() => toggleCollection(collection)} className={generateClass(collection.id)} key={collection.id}>
							{collection.name}
						</div>
					);
				})}
			</div>
		</GameCollectionsStyled>
	);
};
