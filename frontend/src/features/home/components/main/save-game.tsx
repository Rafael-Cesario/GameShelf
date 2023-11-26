import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { ICollection } from "./game-data";
import { useMutation } from "@apollo/client";
import { gameQueries } from "@/services/queries/game";
import { UpdateGameInput, UpdateGameResponse } from "@/services/interfaces/game";

interface Props {
	collections: ICollection[];
}

export const SaveGame = ({ collections }: Props) => {
	const { collections: userCollections } = useSelector((state: Store) => state.collection);
	const { gameData } = useSelector((state: Store) => state.games);
	const [updateGameMutation] = useMutation<UpdateGameResponse, UpdateGameInput>(gameQueries.UPDATE_GAME);

	const filterCollections = () => {
		const filterCollections = userCollections.filter((userCollection) => {
			const hasCollection = collections.find((gameCollection) => gameCollection.id === userCollection.id);
			if (!hasCollection) return userCollection;
		});

		return filterCollections.map(({ id }) => ({ id }));
	};

	// [ Todo ]
	// Todo > Test: Add collections, remove collections
	const saveGame = async () => {
		try {
			if (!gameData) throw new Error("Game Data is undefined");

			const removeCollections = filterCollections();
			const updateGameData = { gameID: gameData.id, addCollections: collections, removeCollections };
			const { data } = await updateGameMutation({ variables: { updateGameData } });
			// dispatch update gameData
			// dispatch update all games
			// dispatch remove game from removed collections and add game to added collections
			// notification
		} catch (error: any) {
			// Todo
			// Catch error
			// Send notification
			console.log(error);
		}
	};

	return (
		<button onClick={() => saveGame()} className="save">
			Salvar alterações
		</button>
	);
};
