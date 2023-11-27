import { Store } from "@/context/store";
import { useDispatch, useSelector } from "react-redux";
import { ICollection } from "./game-data";
import { useMutation } from "@apollo/client";
import { gameQueries } from "@/services/queries/game";
import { UpdateGameInput, UpdateGameResponse } from "@/services/interfaces/game";
import { setAddGames, setAllGamesUpdateOne, setRemoveGames } from "../../context/collection-slice";

interface Props {
	collections: ICollection[];
}

export const SaveGame = ({ collections }: Props) => {
	const { collections: userCollections } = useSelector((state: Store) => state.collection);
	const { gameData } = useSelector((state: Store) => state.games);
	const [updateGameMutation] = useMutation<UpdateGameResponse, UpdateGameInput>(gameQueries.UPDATE_GAME);
	const dispatch = useDispatch();

	const filterCollections = () => {
		return userCollections.filter((userCollection) => {
			const hasCollection = collections.find((gameCollection) => gameCollection.id === userCollection.id);
			if (!hasCollection) return userCollection;
		});
	};

	// [ Todo ]
	// Todo > Test: Add collections, remove collections
	const saveGame = async () => {
		try {
			if (!gameData) throw new Error("Game Data is undefined");

			const updateGameData = {
				gameID: gameData.id,
				addCollections: collections.map(({ id }) => ({ id })),
				removeCollections: filterCollections().map(({ id }) => ({ id })),
			};

			await updateGameMutation({ variables: { updateGameData } });

			dispatch(setAllGamesUpdateOne({ ...gameData, collections }));
			dispatch(setRemoveGames({ removedCollections: filterCollections(), removeGame: { ...gameData, ...collections } }));
			dispatch(setAddGames({ addCollections: collections, game: { ...gameData, ...collections } }));
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
