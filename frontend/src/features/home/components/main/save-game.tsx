import { Store } from "@/context/store";
import { useSelector } from "react-redux";
import { ICollection } from "./game-data";

interface Props {
	collections: ICollection[];
}

export const SaveGame = ({ collections }: Props) => {
	const { gameData } = useSelector((state: Store) => state.games);

	const saveGame = async () => {
		console.log({ collections, gameData });
	};

	return <button onClick={() => saveGame()} className="save">Salvar alterações</button>;
};
